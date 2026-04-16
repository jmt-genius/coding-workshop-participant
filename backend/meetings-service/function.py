"""
Meetings Service: Calendar meetings and meeting-request management.

Endpoints:
  GET  /team/{team_id}            — List meetings for a team
  GET  /requests/{team_id}        — List meeting requests for a team
  POST /create                    — Create a meeting (manager only)
  POST /request                   — Request a meeting (any team member)
  POST /approve                   — Approve a meeting request (manager)
  POST /reject                    — Reject a meeting request (manager)
"""

import json
import logging
import os
import os.path
import uuid
from datetime import datetime
from postgres_service import get_connection

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.apps import meet_v2

logger = logging.getLogger()
logger.setLevel(logging.INFO)


# ---------------------------------------------------------------------------
# Google Meet API integration
# ---------------------------------------------------------------------------

SCOPES = ['https://www.googleapis.com/auth/meetings.space.created']

# Resolve paths relative to this file so it works regardless of cwd
_SERVICE_DIR = os.path.dirname(os.path.abspath(__file__))
_CREDENTIALS_FILES = [f for f in os.listdir(_SERVICE_DIR) if f.startswith('client_secret') and f.endswith('.json')]
_CREDENTIALS_FILE = os.path.join(_SERVICE_DIR, _CREDENTIALS_FILES[0]) if _CREDENTIALS_FILES else os.path.join(_SERVICE_DIR, 'credentials.json')
_TOKEN_FILE = os.path.join(_SERVICE_DIR, 'token.json')


def _get_google_creds():
    """Return valid Google OAuth2 credentials, refreshing or prompting as needed."""
    creds = None
    if os.path.exists(_TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(_TOKEN_FILE, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(_CREDENTIALS_FILE, SCOPES)
            # Use run_console for headless / remote environments;
            # falls back to run_local_server if available.
            try:
                creds = flow.run_local_server(port=0)
            except Exception:
                creds = flow.run_console()
        with open(_TOKEN_FILE, 'w') as token:
            token.write(creds.to_json())
    return creds


def generate_meet_link():
    """
    Create a real Google Meet space via the Meet REST API and return its
    meeting URI (e.g. https://meet.google.com/abc-defg-hij).
    Falls back to a generated placeholder if the API call fails.
    """
    try:
        creds = _get_google_creds()
        client = meet_v2.SpacesServiceClient(credentials=creds)
        response = client.create_space(request=meet_v2.CreateSpaceRequest())
        logger.info("Google Meet space created: %s", response.meeting_uri)
        return response.meeting_uri
    except Exception as e:
        logger.error("Google Meet API error, using fallback: %s", str(e))
        code = uuid.uuid4().hex[:12]
        return f"https://meet.google.com/{code[:3]}-{code[3:7]}-{code[7:]}"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _ensure_manager_of_team(cur, user_id, team_id):
    """Verify the user is the lead of the given team."""
    cur.execute('SELECT "leadId" FROM "Team" WHERE id = %s', (team_id,))
    row = cur.fetchone()
    if not row:
        raise ValueError("Team not found")
    if row[0] != user_id:
        raise ValueError("Only the team manager can perform this action")


def _get_user_team_id(cur, user_id):
    """Return the teamId for an employee, or None."""
    cur.execute('SELECT "teamId" FROM "EmployeeProfile" WHERE "userId" = %s', (user_id,))
    row = cur.fetchone()
    return row[0] if row else None


# ---------------------------------------------------------------------------
# Core functions
# ---------------------------------------------------------------------------

def list_meetings(team_id):
    """Return all meetings for a team, newest first."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute('''
            SELECT m.id, m.title, m.description, m."teamId",
                   m."createdBy", u.name AS "creatorName",
                   m."meetLink", m."startTime", m."endTime",
                   m.status, m."createdAt"
            FROM "Meeting" m
            JOIN "User" u ON u.id = m."createdBy"
            WHERE m."teamId" = %s
            ORDER BY m."startTime" ASC
        ''', (team_id,))
        meetings = []
        for row in cur.fetchall():
            meetings.append({
                "id": row[0],
                "title": row[1],
                "description": row[2],
                "teamId": row[3],
                "createdBy": row[4],
                "creatorName": row[5],
                "meetLink": row[6],
                "startTime": row[7].isoformat() if row[7] else None,
                "endTime": row[8].isoformat() if row[8] else None,
                "status": row[9],
                "createdAt": row[10].isoformat() if row[10] else None,
            })
        return meetings


def list_requests(team_id):
    """Return all meeting requests for a team."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute('''
            SELECT mr.id, mr.title, mr.description, mr."teamId",
                   mr."requestedBy", u.name AS "requesterName",
                   mr."preferredTime", mr."preferredEndTime",
                   mr.status, mr."reviewedBy", mr."meetingId",
                   mr."createdAt"
            FROM "MeetingRequest" mr
            JOIN "User" u ON u.id = mr."requestedBy"
            WHERE mr."teamId" = %s
            ORDER BY mr."createdAt" DESC
        ''', (team_id,))
        requests = []
        for row in cur.fetchall():
            requests.append({
                "id": row[0],
                "title": row[1],
                "description": row[2],
                "teamId": row[3],
                "requestedBy": row[4],
                "requesterName": row[5],
                "preferredTime": row[6].isoformat() if row[6] else None,
                "preferredEndTime": row[7].isoformat() if row[7] else None,
                "status": row[8],
                "reviewedBy": row[9],
                "meetingId": row[10],
                "createdAt": row[11].isoformat() if row[11] else None,
            })
        return requests


def create_meeting(user_id, team_id, title, description, start_time, end_time):
    """Create a meeting (manager only). Generates a Google Meet link."""
    conn = get_connection()
    with conn.cursor() as cur:
        _ensure_manager_of_team(cur, user_id, team_id)
        meeting_id = str(uuid.uuid4())
        meet_link = generate_meet_link()
        cur.execute('''
            INSERT INTO "Meeting" (id, title, description, "teamId", "createdBy",
                                   "meetLink", "startTime", "endTime", status, "createdAt")
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'SCHEDULED', NOW())
            RETURNING id
        ''', (meeting_id, title, description, team_id, user_id,
              meet_link, start_time, end_time))
        conn.commit()
        return {
            "id": meeting_id,
            "title": title,
            "description": description,
            "teamId": team_id,
            "createdBy": user_id,
            "meetLink": meet_link,
            "startTime": start_time,
            "endTime": end_time,
            "status": "SCHEDULED",
        }


def request_meeting(user_id, team_id, title, description, preferred_time, preferred_end_time):
    """Any team member can request a meeting."""
    conn = get_connection()
    with conn.cursor() as cur:
        req_id = str(uuid.uuid4())
        cur.execute('''
            INSERT INTO "MeetingRequest" (id, title, description, "teamId",
                                          "requestedBy", "preferredTime", "preferredEndTime",
                                          status, "createdAt")
            VALUES (%s, %s, %s, %s, %s, %s, %s, 'PENDING', NOW())
            RETURNING id
        ''', (req_id, title, description, team_id, user_id,
              preferred_time, preferred_end_time))
        conn.commit()
        return {
            "id": req_id,
            "title": title,
            "status": "PENDING",
        }


def approve_request(manager_id, request_id):
    """Approve a meeting request — creates a real Meeting and returns it."""
    conn = get_connection()
    with conn.cursor() as cur:
        # Fetch request
        cur.execute('''
            SELECT id, title, description, "teamId", "requestedBy",
                   "preferredTime", "preferredEndTime", status
            FROM "MeetingRequest" WHERE id = %s
        ''', (request_id,))
        req = cur.fetchone()
        if not req:
            raise ValueError("Meeting request not found")
        if req[7] != 'PENDING':
            raise ValueError("Request is not pending")

        team_id = req[3]
        _ensure_manager_of_team(cur, manager_id, team_id)

        # Create the meeting
        meeting_id = str(uuid.uuid4())
        meet_link = generate_meet_link()
        cur.execute('''
            INSERT INTO "Meeting" (id, title, description, "teamId", "createdBy",
                                   "meetLink", "startTime", "endTime", status, "createdAt")
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'SCHEDULED', NOW())
        ''', (meeting_id, req[1], req[2], team_id, manager_id,
              meet_link, req[5], req[6]))

        # Mark request as approved
        cur.execute('''
            UPDATE "MeetingRequest"
            SET status = 'APPROVED', "reviewedBy" = %s, "meetingId" = %s
            WHERE id = %s
        ''', (manager_id, meeting_id, request_id))
        conn.commit()

        return {
            "status": "approved",
            "meetingId": meeting_id,
            "meetLink": meet_link,
            "requestId": request_id,
        }


def reject_request(manager_id, request_id):
    """Reject a meeting request."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute('SELECT "teamId", status FROM "MeetingRequest" WHERE id = %s', (request_id,))
        req = cur.fetchone()
        if not req:
            raise ValueError("Meeting request not found")
        if req[1] != 'PENDING':
            raise ValueError("Request is not pending")

        _ensure_manager_of_team(cur, manager_id, req[0])

        cur.execute('''
            UPDATE "MeetingRequest"
            SET status = 'REJECTED', "reviewedBy" = %s
            WHERE id = %s
        ''', (manager_id, request_id))
        conn.commit()
        return {"status": "rejected", "requestId": request_id}


# ---------------------------------------------------------------------------
# Lambda handler
# ---------------------------------------------------------------------------

def handler(event=None, context=None):
    headers = {"Content-Type": "application/json"}

    try:
        method = event.get("httpMethod", "GET")
        path = event.get("path", "/")
        parts = [p for p in path.split("/") if p]

        if method == "OPTIONS":
            return {"statusCode": 204, "headers": headers, "body": ""}

        # ----- POST routes -----
        if method == "POST":
            body = json.loads(event.get("body", "{}"))
            action = None
            for p in parts:
                if p in ("create", "request", "approve", "reject"):
                    action = p
                    break

            if action == "create":
                result = create_meeting(
                    user_id=body["userId"],
                    team_id=body["teamId"],
                    title=body["title"],
                    description=body.get("description", ""),
                    start_time=body["startTime"],
                    end_time=body["endTime"],
                )
                return {"statusCode": 201, "headers": headers, "body": json.dumps(result, default=str)}

            if action == "request":
                result = request_meeting(
                    user_id=body["userId"],
                    team_id=body["teamId"],
                    title=body["title"],
                    description=body.get("description", ""),
                    preferred_time=body["preferredTime"],
                    preferred_end_time=body["preferredEndTime"],
                )
                return {"statusCode": 201, "headers": headers, "body": json.dumps(result, default=str)}

            if action == "approve":
                result = approve_request(
                    manager_id=body["managerId"],
                    request_id=body["requestId"],
                )
                return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

            if action == "reject":
                result = reject_request(
                    manager_id=body["managerId"],
                    request_id=body["requestId"],
                )
                return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Unknown POST action"})}

        # ----- GET routes -----
        # GET /requests/{team_id}
        if "requests" in parts:
            idx = parts.index("requests")
            team_id = parts[idx + 1] if idx + 1 < len(parts) else None
            if not team_id:
                return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "team_id required"})}
            result = list_requests(team_id)
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

        # GET /team/{team_id}
        if "team" in parts:
            idx = parts.index("team")
            team_id = parts[idx + 1] if idx + 1 < len(parts) else None
            if not team_id:
                return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "team_id required"})}
            result = list_meetings(team_id)
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

        return {"statusCode": 200, "headers": headers, "body": json.dumps({"service": "meetings-service", "status": "ok"})}

    except ValueError as e:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": str(e)})}
    except Exception as e:
        logger.error("Meetings error: %s", str(e))
        return {"statusCode": 500, "headers": headers, "body": json.dumps({"error": "Internal server error", "message": str(e)})}


if __name__ == "__main__":
    from http.server import HTTPServer, BaseHTTPRequestHandler

    PORT = 8106

    class MeetingsHTTPHandler(BaseHTTPRequestHandler):
        def _handle(self, method):
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode() if content_length > 0 else '{}'
            event = {"httpMethod": method, "path": self.path, "body": body}
            result = handler(event)
            self.send_response(result["statusCode"])
            for k, v in result.get("headers", {}).items():
                self.send_header(k, v)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "*")
            self.end_headers()
            self.wfile.write(result.get("body", "").encode())

        def do_GET(self): self._handle("GET")
        def do_POST(self): self._handle("POST")
        def do_OPTIONS(self): self._handle("OPTIONS")
        def log_message(self, format, *args): logger.info(format, *args)

    print(f"Meetings service running on http://localhost:{PORT}")
    HTTPServer(('', PORT), MeetingsHTTPHandler).serve_forever()

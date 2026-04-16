"""
Teams Service: List teams with optional filtering.

Endpoints:
  GET /           — List all teams
  GET /?leadId=X  — List teams filtered by lead
"""

import json
import logging
from postgres_service import get_connection

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_teams(lead_id=None):
    """List all teams, optionally filtered by lead ID."""
    conn = get_connection()
    with conn.cursor() as cur:
        if lead_id:
            cur.execute('''
                SELECT id, name, "leadId", "createdAt"
                FROM "Team"
                WHERE "leadId" = %s
                ORDER BY name
            ''', (lead_id,))
        else:
            cur.execute('''
                SELECT id, name, "leadId", "createdAt"
                FROM "Team"
                ORDER BY name
            ''')

        teams = []
        for row in cur.fetchall():
            teams.append({
                "id": row[0],
                "name": row[1],
                "leadId": row[2],
                "createdAt": row[3].isoformat() if row[3] else None
            })
        return teams


def create_team(name, lead_id):
    """Create a new team."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute('''
            INSERT INTO "Team" (id, name, "leadId", "createdAt", "updatedAt")
            VALUES (%s, %s, %s, NOW(), NOW())
            RETURNING id, name, "leadId"
        ''', (str(uuid.uuid4()), name, lead_id))
        conn.commit()
        row = cur.fetchone()
        return {"id": row[0], "name": row[1], "leadId": row[2]}


import uuid

def handler(event=None, context=None):
    """
    Lambda handler for teams endpoint.
    """
    logger.debug("Received event: %s", event)
    headers = {"Content-Type": "application/json"}

    try:
        method = event.get("httpMethod", "GET")
        
        if method == "POST":
            body = json.loads(event.get("body", "{}"))
            name = body.get("name")
            lead_id = body.get("leadId")
            if not name or not lead_id:
                return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "name and leadId are required"})}
            result = create_team(name, lead_id)
            return {"statusCode": 201, "headers": headers, "body": json.dumps(result)}

        # Extract query parameters
        params = event.get("queryStringParameters") or {} if event else {}
        lead_id = params.get("leadId")

        result = get_teams(lead_id)
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(result, default=str)
        }

    except Exception as e:
        logger.error("Teams error: %s", str(e))
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Failed to process request", "message": str(e)})
        }


if __name__ == "__main__":
    print(handler({"httpMethod": "GET", "path": "/", "queryStringParameters": {}}))

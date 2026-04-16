"""
Logs Service: Record commits, tickets, and bugs.

Endpoints:
  POST /commit  — Log a new commit
  POST /ticket  — Log a new ticket
  POST /bug     — Log a new bug
"""

import json
import logging
import uuid
import datetime
from postgres_service import get_connection

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def log_commit(data):
    """Create a new commit record."""
    conn = get_connection()
    commit_id = str(uuid.uuid4())
    commit_hash = str(uuid.uuid4())[:8].upper()
    with conn.cursor() as cur:
        cur.execute('''
            INSERT INTO "Commit" (id, hash, message, impact, "userId", "projectId", "createdAt")
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id, hash, message, impact, "userId", "projectId", "createdAt"
        ''', (
            commit_id, commit_hash, data.get("message", ""),
            data.get("impact", 1.0), data["userId"],
            data.get("projectId"), datetime.datetime.now()
        ))
        row = cur.fetchone()
        return {
            "id": row[0], "hash": row[1], "message": row[2],
            "impact": row[3], "userId": row[4], "projectId": row[5],
            "createdAt": row[6].isoformat() if row[6] else None
        }


def log_ticket(data):
    """Create a new ticket record."""
    conn = get_connection()
    ticket_id = str(uuid.uuid4())
    status = data.get("status", "CLOSED")
    now = datetime.datetime.now()
    with conn.cursor() as cur:
        cur.execute('''
            INSERT INTO "Ticket" (id, title, status, difficulty, "projectId",
                "assigneeId", "openedById", "closedById", "closedAt", "createdAt")
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, title, status, difficulty, "projectId",
                "assigneeId", "openedById", "closedById", "closedAt", "createdAt"
        ''', (
            ticket_id, data.get("title", ""), status,
            data.get("difficulty", 1.0), data.get("projectId"),
            data.get("assigneeId"), data["openedById"],
            data.get("closedById"),
            now if status == "CLOSED" else None, now
        ))
        row = cur.fetchone()
        return {
            "id": row[0], "title": row[1], "status": row[2],
            "difficulty": row[3], "projectId": row[4],
            "assigneeId": row[5], "openedById": row[6],
            "closedById": row[7],
            "closedAt": row[8].isoformat() if row[8] else None,
            "createdAt": row[9].isoformat() if row[9] else None
        }


def log_bug(data):
    """Create a new bug record."""
    conn = get_connection()
    bug_id = str(uuid.uuid4())
    with conn.cursor() as cur:
        cur.execute('''
            INSERT INTO "Bug" (id, title, severity, status, "projectId",
                "reporterId", "ownerId", "resolverId", "createdAt")
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, title, severity, status, "projectId",
                "reporterId", "ownerId", "resolverId", "createdAt"
        ''', (
            bug_id, data.get("title", ""), data.get("severity", "MEDIUM"),
            data.get("status", "OPEN"), data.get("projectId"),
            data["reporterId"], data.get("ownerId"),
            data.get("resolverId"), datetime.datetime.now()
        ))
        row = cur.fetchone()
        return {
            "id": row[0], "title": row[1], "severity": row[2],
            "status": row[3], "projectId": row[4],
            "reporterId": row[5], "ownerId": row[6],
            "resolverId": row[7],
            "createdAt": row[8].isoformat() if row[8] else None
        }


def handler(event=None, context=None):
    """
    Lambda handler for logging endpoints.
    """
    logger.debug("Received event: %s", event)
    headers = {"Content-Type": "application/json"}

    try:
        # Robust path detection for LocalStack Function URLs
        path = event.get("path") or event.get("rawPath") or "/"
        if (path == "/" or not path) and isinstance(event, dict):
            rc = event.get("requestContext", {})
            if isinstance(rc, dict):
                path = rc.get("http", {}).get("path") or rc.get("path") or "/"
        
        if (path == "/" or not path) and isinstance(event, dict):
            path = "/" + event.get("pathParameters", {}).get("proxy", "").lstrip("/")

        parts = [p for p in path.split("/") if p]
        body = json.loads(event.get("body", "{}")) if event and event.get("body") else {}

        if "commit" in parts:
            result = log_commit(body)
        elif "ticket" in parts:
            result = log_ticket(body)
        elif "bug" in parts:
            result = log_bug(body)
        else:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"error": "Invalid log type. Use /commit, /ticket, or /bug", "path": path})
            }

        return {
            "statusCode": 201,
            "headers": headers,
            "body": json.dumps(result, default=str)
        }

    except Exception as e:
        logger.error("Logs error: %s", str(e))
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Failed to log activity", "message": str(e)})
        }


if __name__ == "__main__":
    test = {
        "httpMethod": "POST",
        "path": "/commit",
        "body": json.dumps({"userId": "test", "projectId": "test", "message": "Test commit"})
    }
    print(handler(test))

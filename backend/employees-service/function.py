"""
Employees Service: List and detail endpoints for employees.

Endpoints:
  GET /           — List all employees
  GET /{user_id}  — Get detailed employee profile
"""

import json
import logging
from postgres_service import get_connection

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def calculate_performance_rating(tickets, commits, bugs):
    """Calculate performance score on 1.0-10.0 scale."""
    score = 4.2 + (tickets * 0.2) + (commits * 0.04) - (bugs * 0.4)
    return round(max(1.0, min(10.0, score)), 1)


def list_employees():
    """List all employees with their profiles."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute('''
            SELECT u.id, u.email, u.name, u.role,
                   ep.id as profile_id, ep."teamId", ep."projectId",
                   ep.specialization, ep."performanceRating",
                   ep."promotionReady", ep."attritionRisk",
                   t.name as team_name
            FROM "User" u
            LEFT JOIN "EmployeeProfile" ep ON ep."userId" = u.id
            LEFT JOIN "Team" t ON t.id = ep."teamId"
            WHERE u.role = 'EMPLOYEE'
            ORDER BY u.name
        ''')
        rows = cur.fetchall()

        users = []
        for row in rows:
            user = {
                "id": row[0], "email": row[1], "name": row[2], "role": row[3],
                "profile": {
                    "id": row[4], "teamId": row[5], "projectId": row[6],
                    "specialization": row[7], "performanceRating": row[8],
                    "promotionReady": row[9], "attritionRisk": row[10],
                    "team": {"name": row[11]} if row[11] else None
                } if row[4] else None
            }
            users.append(user)
        return users


def get_employee_detail(user_id):
    """Get detailed employee profile with stats."""
    conn = get_connection()
    with conn.cursor() as cur:
        # Basic user info
        cur.execute('SELECT id, name, email, role FROM "User" WHERE id = %s', (user_id,))
        user = cur.fetchone()
        if not user:
            return None

        uid, name, email, role = user

        # Profile
        cur.execute('''
            SELECT ep.id, ep."teamId", ep."projectId", ep.specialization,
                   ep."performanceRating", ep."promotionReady", ep."attritionRisk",
                   t.name as team_name, p.name as project_name
            FROM "EmployeeProfile" ep
            LEFT JOIN "Team" t ON t.id = ep."teamId"
            LEFT JOIN "Project" p ON p.id = ep."projectId"
            WHERE ep."userId" = %s
        ''', (uid,))
        profile_row = cur.fetchone()

        profile = None
        if profile_row:
            # Skills
            cur.execute('''
                SELECT id, "skillName", proficiency
                FROM "EmployeeSkill"
                WHERE "profileId" = %s
            ''', (profile_row[0],))
            skills = [{"id": r[0], "skillName": r[1], "proficiency": r[2]} for r in cur.fetchall()]

            # Trainings
            cur.execute('''
                SELECT id, name, description, "completionDate"
                FROM "Training"
                WHERE "profileId" = %s
            ''', (profile_row[0],))
            trainings = [{"id": r[0], "name": r[1], "description": r[2],
                          "completionDate": r[3].isoformat() if r[3] else None} for r in cur.fetchall()]

            profile = {
                "id": profile_row[0], "teamId": profile_row[1],
                "projectId": profile_row[2], "specialization": profile_row[3],
                "performanceRating": profile_row[4], "promotionReady": profile_row[5],
                "attritionRisk": profile_row[6],
                "team": {"name": profile_row[7]} if profile_row[7] else None,
                "project": {"name": profile_row[8]} if profile_row[8] else None,
                "employeeSkills": skills,
                "trainings": trainings
            }

        # Performance reviews
        cur.execute('''
            SELECT pr.id, pr.rating, pr.comments, pr.date,
                   rev.name as reviewer_name
            FROM "PerformanceReview" pr
            LEFT JOIN "User" rev ON rev.id = pr."reviewerId"
            WHERE pr."userId" = %s
            ORDER BY pr.date DESC
        ''', (uid,))
        reviews = [{"id": r[0], "rating": r[1], "comments": r[2],
                     "date": r[3].isoformat() if r[3] else None,
                     "reviewer": {"name": r[4]} if r[4] else None} for r in cur.fetchall()]

        # Project history
        cur.execute('''
            SELECT ph.id, ph.role, ph."startDate", ph."endDate",
                   p.name as project_name, p.id as project_id
            FROM "ProjectHistory" ph
            JOIN "Project" p ON p.id = ph."projectId"
            WHERE ph."userId" = %s
            ORDER BY COALESCE(ph."endDate", ph."startDate") DESC
        ''', (uid,))
        history = [{"id": r[0], "role": r[1],
                     "startDate": r[2].isoformat() if r[2] else None,
                     "endDate": r[3].isoformat() if r[3] else None,
                     "project": {"name": r[4], "id": r[5]}} for r in cur.fetchall()]

        # Stats
        cur.execute('SELECT COUNT(*) FROM "Commit" WHERE "userId" = %s', (uid,))
        total_commits = cur.fetchone()[0]
        cur.execute('SELECT COUNT(*) FROM "Ticket" WHERE "assigneeId" = %s AND status = %s', (uid, 'CLOSED'))
        total_tickets = cur.fetchone()[0]
        cur.execute('SELECT COUNT(*) FROM "Bug" WHERE "ownerId" = %s', (uid,))
        total_bugs = cur.fetchone()[0]
        rating = calculate_performance_rating(total_tickets, total_commits, total_bugs)

        return {
            "id": uid,
            "name": name,
            "email": email,
            "profile": profile,
            "performanceReviews": reviews,
            "projectHistory": history,
            "stats": {
                "commits": total_commits,
                "tickets": total_tickets,
                "bugs": total_bugs,
                "rating": rating
            }
        }


def list_users():
    """List all users in the system."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute('SELECT id, email, name, role FROM "User" ORDER BY name')
        rows = cur.fetchall()
        return [{"id": r[0], "email": r[1], "name": r[2], "role": r[3]} for r in rows]


def update_metrics(user_id, metrics):
    """Update employee performance metrics (simulated)."""
    conn = get_connection()
    with conn.cursor() as cur:
        # Calculate a new rating based on fake logic for the demo, same as monolith
        impact = metrics.get('featureImpact', 1.0)
        new_rating = min(10.0, max(1.0, impact * 2 + 3.0))
        
        cur.execute('''
            UPDATE "EmployeeProfile"
            SET "performanceRating" = %s
            WHERE "userId" = %s
            RETURNING "performanceRating"
        ''', (round(new_rating, 1), user_id))
        conn.commit()
        return {"status": "success", "rating": round(new_rating, 1)}


def handler(event=None, context=None):
    """
    Lambda handler for employee endpoints.
    """
    logger.debug("Received event: %s", event)
    headers = {"Content-Type": "application/json"}

    try:
        method = event.get("httpMethod", "GET")
        
        # Robust path detection for LocalStack Function URLs
        path = event.get("path") or event.get("rawPath") or "/"
        if (path == "/" or not path) and isinstance(event, dict):
            # Check requestContext for real path
            rc = event.get("requestContext", {})
            if isinstance(rc, dict):
                path = rc.get("http", {}).get("path") or rc.get("path") or "/"
        
        # Fallback: Check 'proxy' parameter often used in API Gateway events
        if (not path or path == "/") and isinstance(event, dict):
            path = "/" + event.get("pathParameters", {}).get("proxy", "").lstrip("/")

        parts = [p for p in path.split("/") if p]

        # POST /employees/metrics
        if method == "POST" and "metrics" in parts:
            body = json.loads(event.get("body", "{}"))
            user_id = body.get("userId")
            metrics_data = body.get("metrics", {})
            result = update_metrics(user_id, metrics_data)
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result)}

        # GET /users
        if "users" in parts:
            result = list_users()
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

        # GET /{user_id}
        # Check if the last part looks like a UUID (long string)
        if parts and len(parts[-1]) > 10 and "users" not in parts and "metrics" not in parts:
            user_id = parts[-1]
            result = get_employee_detail(user_id)
            if result is None:
                return {
                    "statusCode": 404,
                    "headers": headers,
                    "body": json.dumps({"detail": "Employee not found"})
                }
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

        # GET / (List all employees)
        result = list_employees()
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(result, default=str)
        }

    except Exception as e:
        logger.error("Employees error: %s", str(e))
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Failed to process request", "message": str(e)})
        }


if __name__ == "__main__":
    print(handler({"httpMethod": "GET", "path": "/"}))

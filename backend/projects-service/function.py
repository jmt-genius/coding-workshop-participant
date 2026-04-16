"""
Projects Service: Manager project overview with engineer stats.

Endpoints:
  GET /manager/{manager_id}  — Get all projects for a manager with engineer stats
"""

import json
import logging
from postgres_service import get_connection

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def get_manager_projects(manager_id):
    """Get all projects managed by a specific user with engineer breakdowns."""
    conn = get_connection()
    with conn.cursor() as cur:
        # Fetch projects
        cur.execute('''
            SELECT id, name, description, status, "requiredSkills"
            FROM "Project"
            WHERE "managerId" = %s
        ''', (manager_id,))
        projects = cur.fetchall()

        result = []
        for proj_id, proj_name, proj_desc, proj_status, required_skills in projects:
            # Engineers assigned to this project
            cur.execute('''
                SELECT ep."userId", u.name, ep.specialization, ep."performanceRating", ep.id as profile_id
                FROM "EmployeeProfile" ep
                JOIN "User" u ON u.id = ep."userId"
                WHERE ep."projectId" = %s
            ''', (proj_id,))
            engineers_rows = cur.fetchall()

            engineers_stats = []
            for eng_uid, eng_name, eng_spec, eng_rating, profile_id in engineers_rows:
                # Project-specific counts
                cur.execute('SELECT COUNT(*) FROM "Commit" WHERE "userId" = %s AND "projectId" = %s', (eng_uid, proj_id))
                commits = cur.fetchone()[0]
                cur.execute('SELECT COUNT(*) FROM "Ticket" WHERE "assigneeId" = %s AND "projectId" = %s AND status = %s',
                            (eng_uid, proj_id, 'CLOSED'))
                tickets = cur.fetchone()[0]
                cur.execute('SELECT COUNT(*) FROM "Bug" WHERE "ownerId" = %s AND "projectId" = %s AND status = %s',
                            (eng_uid, proj_id, 'OPEN'))
                bugs = cur.fetchone()[0]

                # Skills
                cur.execute('SELECT "skillName" FROM "EmployeeSkill" WHERE "profileId" = %s', (profile_id,))
                eng_skills = [r[0] for r in cur.fetchall()]

                has_gap = any(req not in eng_skills for req in (required_skills or [])) if required_skills else False

                engineers_stats.append({
                    "id": eng_uid,
                    "name": eng_name,
                    "role": eng_spec,
                    "skills": eng_skills,
                    "hasSkillGap": has_gap,
                    "performanceRating": eng_rating,
                    "metrics": {
                        "commits": commits,
                        "tickets": tickets,
                        "bugs": bugs
                    }
                })

            # Total project-level counts
            cur.execute('SELECT COUNT(*) FROM "Commit" WHERE "projectId" = %s', (proj_id,))
            total_commits = cur.fetchone()[0]
            cur.execute('SELECT COUNT(*) FROM "Ticket" WHERE "projectId" = %s AND status = %s', (proj_id, 'CLOSED'))
            total_tickets = cur.fetchone()[0]
            cur.execute('SELECT COUNT(*) FROM "Bug" WHERE "projectId" = %s AND status = %s', (proj_id, 'OPEN'))
            total_bugs = cur.fetchone()[0]

            result.append({
                "id": proj_id,
                "name": proj_name,
                "description": proj_desc,
                "status": proj_status,
                "requiredSkills": required_skills or [],
                "engineers": engineers_stats,
                "totalCommits": total_commits,
                "totalTickets": total_tickets,
                "totalBugs": total_bugs
            })

        return result


def handler(event=None, context=None):
    """
    Lambda handler for project endpoints.
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

        # manager_id is the last part of /manager/{manager_id}
        if "manager" in parts:
            manager_id = parts[-1]
            result = get_manager_projects(manager_id)
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps(result, default=str)
            }

        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Invalid projects path", "path": path})
        }

    except Exception as e:
        logger.error("Projects error: %s", str(e))
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Failed to fetch projects", "message": str(e)})
        }


if __name__ == "__main__":
    print(handler({"httpMethod": "GET", "path": "/manager/test-id"}))

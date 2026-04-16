"""
Analytics Service: Squad and global analytics endpoints.

Endpoints:
  GET /squad/{team_id}  — Get squad analytics for a specific team
  GET /global           — Get global analytics across all teams
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


def get_squad_analytics(team_id):
    """Get squad analytics for a specific team."""
    conn = get_connection()
    with conn.cursor() as cur:
        # Fetch team
        cur.execute('SELECT id, name FROM "Team" WHERE id = %s', (team_id,))
        team = cur.fetchone()
        if not team:
            return None

        team_id_val, team_name = team

        # Fetch team members (all employees regardless of status)
        cur.execute('''
            SELECT ep."userId", u.name, ep."performanceRating", ep."attritionRisk"
            FROM "EmployeeProfile" ep
            JOIN "User" u ON u.id = ep."userId"
            WHERE ep."teamId" = %s
        ''', (team_id_val,))
        members = cur.fetchall()

        member_stats = []
        total_squad_score = 0

        for user_id, user_name, perf_rating, attrition_risk in members:
            cur.execute('SELECT COUNT(*) FROM "Commit" WHERE "userId" = %s', (user_id,))
            commits = cur.fetchone()[0]
            cur.execute('SELECT COUNT(*) FROM "Ticket" WHERE "assigneeId" = %s AND status = %s', (user_id, 'CLOSED'))
            tickets = cur.fetchone()[0]
            cur.execute('SELECT COUNT(*) FROM "Bug" WHERE "ownerId" = %s', (user_id,))
            bugs = cur.fetchone()[0]

            score = calculate_performance_rating(tickets, commits, bugs)
            total_squad_score += score

            member_stats.append({
                "id": user_id,
                "name": user_name,
                "score": score,
                "performanceRating": perf_rating,
                "status": attrition_risk or "LOW",
                "commits": commits,
                "tickets": tickets,
                "bugs": bugs
            })

        avg_score = total_squad_score / len(members) if members else 0

        # Fetch achievements
        cur.execute('SELECT id, title, description, date, icon FROM "Achievement" WHERE "teamId" = %s', (team_id_val,))
        achievements = []
        for row in cur.fetchall():
            achievements.append({
                "id": row[0], "title": row[1], "description": row[2],
                "date": row[3].isoformat() if row[3] else None, "icon": row[4]
            })

        # Fetch milestones from team projects
        cur.execute('''
            SELECT m.id, m."projectId", p.name, m.title, m.description,
                   m.duration, m.impact, m."isAchieved", m.date
            FROM "Milestone" m
            JOIN "Project" p ON p.id = m."projectId"
            WHERE p."teamId" = %s
        ''', (team_id_val,))
        milestones = []
        for row in cur.fetchall():
            milestones.append({
                "id": row[0], "projectId": row[1], "projectName": row[2],
                "title": row[3], "description": row[4], "duration": row[5],
                "impact": row[6], "isAchieved": row[7],
                "date": row[8].isoformat() if row[8] else None
            })

        return {
            "teamName": team_name,
            "averagePerformance": round(avg_score, 1),
            "memberBreakdown": member_stats,
            "achievements": achievements,
            "milestones": milestones
        }


def get_global_analytics():
    """Get global analytics across all teams."""
    conn = get_connection()
    with conn.cursor() as cur:
        # Fetch teams with members
        cur.execute('SELECT id, name FROM "Team"')
        teams = cur.fetchall()

        # Fetch user count
        cur.execute('SELECT COUNT(*) FROM "User" WHERE role = %s', ('EMPLOYEE',))
        active_engineers = cur.fetchone()[0]

        # Aggregate metrics
        cur.execute('SELECT COUNT(*) FROM "Commit"')
        total_commits = cur.fetchone()[0]
        cur.execute('SELECT COUNT(*) FROM "Ticket" WHERE status = %s', ('CLOSED',))
        total_tickets = cur.fetchone()[0]
        cur.execute('SELECT COUNT(*) FROM "Bug"')
        total_bugs = cur.fetchone()[0]

        # Team rankings
        team_rankings = []
        for team_id, team_name in teams:
            cur.execute('''
                SELECT ep."userId" FROM "EmployeeProfile" ep WHERE ep."teamId" = %s
            ''', (team_id,))
            member_ids = [row[0] for row in cur.fetchall()]

            team_score = 0
            if member_ids:
                for uid in member_ids:
                    cur.execute('SELECT COUNT(*) FROM "Commit" WHERE "userId" = %s', (uid,))
                    c = cur.fetchone()[0]
                    cur.execute('SELECT COUNT(*) FROM "Ticket" WHERE "assigneeId" = %s AND status = %s', (uid, 'CLOSED'))
                    t = cur.fetchone()[0]
                    cur.execute('SELECT COUNT(*) FROM "Bug" WHERE "ownerId" = %s', (uid,))
                    b = cur.fetchone()[0]
                    team_score += calculate_performance_rating(t, c, b)
                team_score = team_score / len(member_ids)

            team_rankings.append({
                "id": team_id,
                "name": team_name,
                "score": round(team_score, 1),
                "memberCount": len(member_ids)
            })

        team_rankings.sort(key=lambda x: x["score"], reverse=True)

        # HR metrics
        cur.execute('SELECT COUNT(*) FROM "EmployeeProfile" WHERE "promotionReady" = true')
        promotions = cur.fetchone()[0]
        cur.execute('SELECT COUNT(*) FROM "EmployeeProfile" WHERE "attritionRisk" = %s', ('HIGH',))
        high_attrition = cur.fetchone()[0]

        # Skill distribution
        cur.execute('''
            SELECT "skillName", COUNT(*) as cnt
            FROM "EmployeeSkill"
            GROUP BY "skillName"
            ORDER BY cnt DESC
            LIMIT 5
        ''')
        skill_distribution = [{"skill": row[0], "count": row[1]} for row in cur.fetchall()]

        return {
            "activeEngineers": active_engineers,
            "totalTeams": len(teams),
            "teamRankings": team_rankings,
            "aggregateMetrics": {
                "velocity": total_tickets,
                "activity": total_commits,
                "qualityRisk": total_bugs
            },
            "hrMetrics": {
                "promotionReady": promotions,
                "highAttritionRisk": high_attrition,
                "skillDistribution": skill_distribution
            }
        }


def handler(event=None, context=None):
    """
    Lambda handler for analytics endpoints.
    """
    headers = {"Content-Type": "application/json"}

    try:
        method = event.get("httpMethod", "GET") if event else "GET"
        
        # Robust path detection for LocalStack Function URLs
        path = event.get("path") or event.get("rawPath") or "/"
        if (not path or path == "/") and isinstance(event, dict):
            # Check requestContext for real path
            rc = event.get("requestContext", {})
            if isinstance(rc, dict):
                path = rc.get("http", {}).get("path") or rc.get("path") or "/"
        
        # Fallback: Check 'proxy' parameter often used in API Gateway events
        if (not path or path == "/") and isinstance(event, dict):
            path = "/" + event.get("pathParameters", {}).get("proxy", "").lstrip("/")

        parts = [p for p in path.split("/") if p]

        if "global" in parts:
            result = get_global_analytics()
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps(result, default=str)
            }

        elif "squad" in parts:
            # team_id is usually following 'squad'
            team_id = None
            if "squad" in parts:
                idx = parts.index("squad")
                if idx + 1 < len(parts):
                    team_id = parts[idx + 1]
            
            if not team_id:
                return {
                    "statusCode": 400,
                    "headers": headers,
                    "body": json.dumps({"error": "No team ID provided"})
                }

            result = get_squad_analytics(team_id)
            if result is None:
                return {
                    "statusCode": 404,
                    "headers": headers,
                    "body": json.dumps({"detail": "Team not found"})
                }

            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps(result, default=str)
            }

        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({
                "error": "Invalid analytics path", 
                "received_path": path,
                "parts": parts,
                "event_keys": list(event.keys()) if isinstance(event, dict) else []
            })
        }

    except Exception as e:
        logger.error("Analytics error: %s", str(e))
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Analytics failed", "message": str(e)})
        }


if __name__ == "__main__":
    print(handler({"httpMethod": "GET", "path": "/global"}))

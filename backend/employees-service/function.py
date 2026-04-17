"""
Employees Service: List and detail endpoints for employees.

Endpoints:
  GET /           — List all employees
  GET /{user_id}  — Get detailed employee profile
"""

import json
import logging
import uuid
import os
import requests
from postgres_service import get_connection

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def calculate_performance_rating(tickets, commits, bugs):
    """Calculate performance score on 1.0-10.0 scale."""
    score = 4.2 + (tickets * 0.2) + (commits * 0.04) - (bugs * 0.4)
    return round(max(1.0, min(10.0, score)), 1)


def list_employees():
    """List all employees with their profiles."""
    conn = get_conn34ection()
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


def get_manager_engineers(manager_id):
    """List all engineers managed by the given manager."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute(
            '''
            SELECT DISTINCT
                u.id,
                u.email,
                u.name,
                u.role,
                ep.id,
                ep."teamId",
                ep."projectId",
                ep.specialization,
                ep."performanceRating",
                ep."promotionReady",
                ep."attritionRisk",
                t.name AS team_name,
                p.name AS project_name
            FROM "User" u
            JOIN "EmployeeProfile" ep ON ep."userId" = u.id
            LEFT JOIN "Team" t ON t.id = ep."teamId"
            LEFT JOIN "Project" p ON p.id = ep."projectId"
            LEFT JOIN "Project" mp ON mp.id = ep."projectId"
            WHERE u.role = 'EMPLOYEE'
              AND (
                t."leadId" = %s OR
                mp."managerId" = %s
              )
            ORDER BY u.name
            ''',
            (manager_id, manager_id),
        )
        rows = cur.fetchall()

        engineers = []
        for row in rows:
            user_id = row[0]
            cur.execute('SELECT "skillName" FROM "EmployeeSkill" WHERE "profileId" = %s ORDER BY "skillName"', (row[4],))
            skills = [skill[0] for skill in cur.fetchall()]

            cur.execute('SELECT COUNT(*) FROM "Commit" WHERE "userId" = %s', (user_id,))
            commits = cur.fetchone()[0]
            cur.execute('SELECT COUNT(*) FROM "Ticket" WHERE "assigneeId" = %s AND status = %s', (user_id, 'CLOSED'))
            tickets = cur.fetchone()[0]
            cur.execute('SELECT COUNT(*) FROM "Bug" WHERE "ownerId" = %s AND status = %s', (user_id, 'OPEN'))
            bugs = cur.fetchone()[0]

            engineers.append({
                "id": row[0],
                "email": row[1],
                "name": row[2],
                "role": row[3],
                "profile": {
                    "id": row[4],
                    "teamId": row[5],
                    "projectId": row[6],
                    "specialization": row[7],
                    "performanceRating": row[8],
                    "promotionReady": row[9],
                    "attritionRisk": row[10],
                    "team": {"name": row[11]} if row[11] else None,
                    "project": {"name": row[12]} if row[12] else None,
                    "employeeSkills": skills,
                },
                "stats": {
                    "commits": commits,
                    "tickets": tickets,
                    "bugs": bugs,
                    "rating": calculate_performance_rating(tickets, commits, bugs),
                },
                "isSuspended": row[10] == "SUSPENDED",
            })

        return engineers


def ensure_manager_scope(cur, manager_id, user_id):
    """Ensure the engineer is currently under the given manager."""
    cur.execute(
        '''
        SELECT ep.id, ep."teamId", ep."projectId", ep.specialization
        FROM "EmployeeProfile" ep
        LEFT JOIN "Team" t ON t.id = ep."teamId"
        LEFT JOIN "Project" p ON p.id = ep."projectId"
        WHERE ep."userId" = %s
          AND (t."leadId" = %s OR p."managerId" = %s)
        ''',
        (user_id, manager_id, manager_id),
    )
    row = cur.fetchone()
    if not row:
        raise ValueError("Engineer is not managed by this manager")
    return {
        "profileId": row[0],
        "teamId": row[1],
        "projectId": row[2],
        "specialization": row[3] or "Engineer",
    }


def suspend_engineer(manager_id, user_id):
    """Mark an engineer as suspended."""
    conn = get_connection()
    with conn.cursor() as cur:
        ensure_manager_scope(cur, manager_id, user_id)
        cur.execute(
            '''
            UPDATE "EmployeeProfile"
            SET "attritionRisk" = 'SUSPENDED'
            WHERE "userId" = %s
            RETURNING "userId"
            ''',
            (user_id,),
        )
        conn.commit()
        if not cur.fetchone():
            raise ValueError("Engineer not found")
        return {"status": "success", "userId": user_id, "isSuspended": True}


def unsuspend_engineer(manager_id, user_id):
    """Remove suspension from an engineer."""
    conn = get_connection()
    with conn.cursor() as cur:
        ensure_manager_scope(cur, manager_id, user_id)
        cur.execute(
            '''
            UPDATE "EmployeeProfile"
            SET "attritionRisk" = 'LOW'
            WHERE "userId" = %s
            RETURNING "userId"
            ''',
            (user_id,),
        )
        conn.commit()
        if not cur.fetchone():
            raise ValueError("Engineer not found")
        return {"status": "success", "userId": user_id, "isSuspended": False}


def promote_engineer(manager_id, user_id):
    """Mark an engineer as promotion ready."""
    conn = get_connection()
    with conn.cursor() as cur:
        ensure_manager_scope(cur, manager_id, user_id)
        cur.execute(
            '''
            UPDATE "EmployeeProfile"
            SET "promotionReady" = true
            WHERE "userId" = %s
            RETURNING "userId"
            ''',
            (user_id,),
        )
        conn.commit()
        if not cur.fetchone():
            raise ValueError("Engineer not found")
        return {"status": "success", "userId": user_id, "promotionReady": True}


def add_performance_review(manager_id, user_id, rating, comments):
    """Add a performance review and persist the latest rating."""
    conn = get_connection()
    with conn.cursor() as cur:
        ensure_manager_scope(cur, manager_id, user_id)
        cur.execute(
            '''
            INSERT INTO "PerformanceReview" (id, "userId", "reviewerId", rating, comments, date)
            VALUES (%s, %s, %s, %s, %s, NOW())
            ''',
            (str(uuid.uuid4()), user_id, manager_id, rating, comments),
        )
        cur.execute(
            '''
            UPDATE "EmployeeProfile"
            SET "performanceRating" = %s
            WHERE "userId" = %s
            ''',
            (round(float(rating), 1), user_id),
        )
        conn.commit()
        return {"status": "success", "userId": user_id, "rating": rating}


def remove_from_project(manager_id, user_id):
    """Unassign an engineer from their current project."""
    conn = get_connection()
    with conn.cursor() as cur:
        profile = ensure_manager_scope(cur, manager_id, user_id)
        if not profile["projectId"]:
            return {"status": "success", "userId": user_id, "projectId": None}

        cur.execute(
            '''
            UPDATE "ProjectHistory"
            SET "endDate" = NOW()
            WHERE "userId" = %s AND "projectId" = %s AND "endDate" IS NULL
            ''',
            (user_id, profile["projectId"]),
        )
        cur.execute(
            'SELECT id FROM "Team" WHERE id = %s AND "leadId" = %s',
            (profile["teamId"], manager_id),
        )
        managed_team = cur.fetchone() if profile["teamId"] else None

        if managed_team:
            cur.execute(
                '''
                UPDATE "EmployeeProfile"
                SET "projectId" = NULL,
                    "teamId" = NULL
                WHERE "userId" = %s
                ''',
                (user_id,),
            )
        else:
            cur.execute(
                '''
                UPDATE "EmployeeProfile"
                SET "projectId" = NULL
                WHERE "userId" = %s
                ''',
                (user_id,),
            )
        conn.commit()
        return {
            "status": "success",
            "userId": user_id,
            "projectId": None,
            "teamId": None if managed_team else profile["teamId"],
        }


def assign_to_project(manager_id, user_id, project_id):
    """Assign an engineer to a project managed by the current manager."""
    conn = get_connection()
    with conn.cursor() as cur:
        profile = ensure_manager_scope(cur, manager_id, user_id)
        cur.execute(
            'SELECT id, "teamId" FROM "Project" WHERE id = %s AND "managerId" = %s',
            (project_id, manager_id),
        )
        project = cur.fetchone()
        if not project:
            raise ValueError("Project not found for this manager")

        target_project_id, target_team_id = project

        if profile["projectId"] and profile["projectId"] != target_project_id:
            cur.execute(
                '''
                UPDATE "ProjectHistory"
                SET "endDate" = NOW()
                WHERE "userId" = %s AND "projectId" = %s AND "endDate" IS NULL
                ''',
                (user_id, profile["projectId"]),
            )

        cur.execute(
            '''
            UPDATE "EmployeeProfile"
            SET "projectId" = %s,
                "teamId" = %s
            WHERE "userId" = %s
            ''',
            (target_project_id, target_team_id, user_id),
        )

        cur.execute(
            '''
            SELECT id
            FROM "ProjectHistory"
            WHERE "userId" = %s AND "projectId" = %s AND "endDate" IS NULL
            ''',
            (user_id, target_project_id),
        )
        existing_history = cur.fetchone()
        if not existing_history:
            cur.execute(
                '''
                INSERT INTO "ProjectHistory" (id, "userId", "projectId", role, "startDate", "endDate")
                VALUES (%s, %s, %s, %s, NOW(), NULL)
                ''',
                (str(uuid.uuid4()), user_id, target_project_id, profile["specialization"]),
            )

        conn.commit()
        return {
            "status": "success",
            "userId": user_id,
            "projectId": target_project_id,
            "teamId": target_team_id,
        }


def remove_from_team(manager_id, user_id):
    """Unassign an engineer from the current team led by the manager."""
    conn = get_connection()
    with conn.cursor() as cur:
        profile = ensure_manager_scope(cur, manager_id, user_id)
        if not profile["teamId"]:
            return {"status": "success", "userId": user_id, "teamId": None}

        cur.execute('SELECT id FROM "Team" WHERE id = %s AND "leadId" = %s', (profile["teamId"], manager_id))
        team = cur.fetchone()
        if not team:
            raise ValueError("Engineer is not on a team led by this manager")

        if profile["projectId"]:
            cur.execute(
                'SELECT id FROM "Project" WHERE id = %s AND "managerId" = %s',
                (profile["projectId"], manager_id),
            )
            managed_project = cur.fetchone()
            if managed_project:
                cur.execute(
                    '''
                    UPDATE "ProjectHistory"
                    SET "endDate" = NOW()
                    WHERE "userId" = %s AND "projectId" = %s AND "endDate" IS NULL
                    ''',
                    (user_id, profile["projectId"]),
                )

        cur.execute(
            '''
            UPDATE "EmployeeProfile"
            SET "teamId" = NULL,
                "projectId" = NULL
            WHERE "userId" = %s
            ''',
            (user_id,),
        )
        conn.commit()
        return {"status": "success", "userId": user_id, "teamId": None, "projectId": None}


def get_employee_detail(user_id):
    """Get detailed employee profile with stats."""
    try:
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
                    "projectId": profile_row[2], "specialization": profile_row[3] or "Engineer",
                    "performanceRating": profile_row[4] if profile_row[4] is not None else 0.0,
                    "promotionReady": profile_row[5] if profile_row[5] is not None else False,
                    "attritionRisk": profile_row[6] if profile_row[6] is not None else "LOW",
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
    except Exception as e:
        logger.error(f"get_employee_detail error for user {user_id}: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return None


def list_all_engineers():
    """List all engineers with full details for HR database view."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute('''
            SELECT u.id, u.name, u.email, u.role,
                   ep.id AS profile_id,
                   ep.specialization,
                   ep."performanceRating",
                   ep."promotionReady",
                   ep."attritionRisk",
                   ep."joinedAt",
                   t.name AS team_name,
                   t.id AS team_id,
                   mgr.name AS manager_name,
                   mgr.id AS manager_id,
                   p.name AS project_name,
                   p.id AS project_id,
                   p.status AS project_status
            FROM "User" u
            LEFT JOIN "EmployeeProfile" ep ON ep."userId" = u.id
            LEFT JOIN "Team" t ON t.id = ep."teamId"
            LEFT JOIN "User" mgr ON mgr.id = t."leadId"
            LEFT JOIN "Project" p ON p.id = ep."projectId"
            WHERE u.role = 'EMPLOYEE'
            ORDER BY u.name
        ''')
        rows = cur.fetchall()

        engineers = []
        for row in rows:
            profile_id = row[4]
            user_id = row[0]

            # Skills
            skills = []
            if profile_id:
                cur.execute('SELECT "skillName", proficiency FROM "EmployeeSkill" WHERE "profileId" = %s ORDER BY proficiency DESC', (profile_id,))
                skills = [{"skillName": s[0], "proficiency": s[1]} for s in cur.fetchall()]

            # Stats
            cur.execute('SELECT COUNT(*) FROM "Commit" WHERE "userId" = %s', (user_id,))
            commits = cur.fetchone()[0]
            cur.execute('SELECT COUNT(*) FROM "Ticket" WHERE "assigneeId" = %s AND status = %s', (user_id, 'CLOSED'))
            tickets = cur.fetchone()[0]
            cur.execute('SELECT COUNT(*) FROM "Bug" WHERE "ownerId" = %s AND status = %s', (user_id, 'OPEN'))
            bugs = cur.fetchone()[0]

            engineers.append({
                "id": user_id,
                "name": row[1],
                "email": row[2],
                "specialization": row[5] or "Generalist",
                "performanceRating": row[6],
                "promotionReady": row[7] or False,
                "attritionRisk": row[8] or "LOW",
                "joinedAt": row[9].isoformat() if row[9] else None,
                "teamName": row[10],
                "teamId": row[11],
                "managerName": row[12],
                "managerId": row[13],
                "projectName": row[14],
                "projectId": row[15],
                "projectStatus": row[16],
                "skills": skills,
                "stats": {
                    "commits": commits,
                    "tickets": tickets,
                    "bugs": bugs,
                    "rating": calculate_performance_rating(tickets, commits, bugs),
                }
            })
        return engineers


def list_all_managers():
    """List all managers with their teams, projects, and team members for HR database view."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute('''
            SELECT u.id, u.name, u.email
            FROM "User" u
            WHERE u.role = 'MANAGER'
            ORDER BY u.name
        ''')
        managers = cur.fetchall()

        result = []
        for mgr in managers:
            mgr_id, mgr_name, mgr_email = mgr

            # Teams led by this manager
            cur.execute('''
                SELECT t.id, t.name
                FROM "Team" t
                WHERE t."leadId" = %s
                ORDER BY t.name
            ''', (mgr_id,))
            teams = [{"id": r[0], "name": r[1]} for r in cur.fetchall()]

            # Projects managed
            cur.execute('''
                SELECT p.id, p.name, p.status, t.name AS team_name
                FROM "Project" p
                LEFT JOIN "Team" t ON t.id = p."teamId"
                WHERE p."managerId" = %s
                ORDER BY p.name
            ''', (mgr_id,))
            projects = [{"id": r[0], "name": r[1], "status": r[2], "teamName": r[3]} for r in cur.fetchall()]

            # Team members under this manager (via team lead or project manager)
            cur.execute('''
                SELECT DISTINCT u.id, u.name, u.email,
                       ep.specialization,
                       ep."promotionReady",
                       ep."attritionRisk",
                       ep."performanceRating",
                       t.name AS team_name,
                       p.name AS project_name
                FROM "User" u
                JOIN "EmployeeProfile" ep ON ep."userId" = u.id
                LEFT JOIN "Team" t ON t.id = ep."teamId"
                LEFT JOIN "Project" p ON p.id = ep."projectId"
                WHERE u.role = 'EMPLOYEE'
                  AND (t."leadId" = %s OR p."managerId" = %s)
                ORDER BY u.name
            ''', (mgr_id, mgr_id))
            members = []
            for r in cur.fetchall():
                members.append({
                    "id": r[0], "name": r[1], "email": r[2],
                    "specialization": r[3] or "Generalist",
                    "promotionReady": r[4] or False,
                    "attritionRisk": r[5] or "LOW",
                    "performanceRating": r[6],
                    "teamName": r[7],
                    "projectName": r[8],
                })

            result.append({
                "id": mgr_id,
                "name": mgr_name,
                "email": mgr_email,
                "teams": teams,
                "projects": projects,
                "members": members,
                "teamCount": len(teams),
                "projectCount": len(projects),
                "memberCount": len(members),
            })
        return result


def recruit_from_talent_pool(manager_id, user_id, project_id):
    """Recruit a talent pool candidate into a manager's project and team."""
    conn = get_connection()
    with conn.cursor() as cur:
        # Verify user is in talent pool (no team, no project)
        cur.execute('''
            SELECT ep.id, ep.specialization
            FROM "EmployeeProfile" ep
            WHERE ep."userId" = %s AND ep."teamId" IS NULL AND ep."projectId" IS NULL
        ''', (user_id,))
        profile = cur.fetchone()
        if not profile:
            raise ValueError("Employee is not in the talent pool")
        profile_id, specialization = profile

        # Verify project belongs to this manager
        cur.execute(
            'SELECT id, "teamId" FROM "Project" WHERE id = %s AND "managerId" = %s',
            (project_id, manager_id),
        )
        project = cur.fetchone()
        if not project:
            raise ValueError("Project not found for this manager")
        target_project_id, target_team_id = project

        # Assign to project and team
        cur.execute('''
            UPDATE "EmployeeProfile"
            SET "projectId" = %s, "teamId" = %s, "updatedAt" = NOW()
            WHERE "userId" = %s
        ''', (target_project_id, target_team_id, user_id))

        # Create project history
        cur.execute('''
            INSERT INTO "ProjectHistory" (id, "userId", "projectId", role, "startDate", "endDate")
            VALUES (%s, %s, %s, %s, NOW(), NULL)
        ''', (str(uuid.uuid4()), user_id, target_project_id, specialization or 'Engineer'))

        conn.commit()
        return {
            "status": "success",
            "userId": user_id,
            "projectId": target_project_id,
            "teamId": target_team_id,
        }


def get_manager_projects(manager_id):
    """Get all projects for a manager (for recruit dropdown)."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute('''
            SELECT p.id, p.name, p.status, t.name AS team_name
            FROM "Project" p
            LEFT JOIN "Team" t ON t.id = p."teamId"
            WHERE p."managerId" = %s
            ORDER BY p.name
        ''', (manager_id,))
        return [{"id": r[0], "name": r[1], "status": r[2], "teamName": r[3]} for r in cur.fetchall()]


def list_talent_pool():
    """List employees in the talent pool (no team and no project assigned)."""
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute('''
            SELECT u.id, u.name, u.email,
                   ep.id AS profile_id,
                   ep.specialization,
                   ep."joinedAt",
                   ep."attritionRisk"
            FROM "User" u
            JOIN "EmployeeProfile" ep ON ep."userId" = u.id
            WHERE u.role = 'EMPLOYEE'
              AND ep."teamId" IS NULL
              AND ep."projectId" IS NULL
            ORDER BY ep."joinedAt" DESC
        ''')
        rows = cur.fetchall()

        pool = []
        for row in rows:
            profile_id = row[3]
            # Skills
            cur.execute('SELECT "skillName", proficiency FROM "EmployeeSkill" WHERE "profileId" = %s ORDER BY proficiency DESC', (profile_id,))
            skills = [{"skillName": s[0], "proficiency": s[1]} for s in cur.fetchall()]
            # Trainings
            cur.execute('SELECT id, name, description, "completionDate" FROM "Training" WHERE "profileId" = %s ORDER BY "completionDate" DESC', (profile_id,))
            trainings = [{"id": t[0], "name": t[1], "description": t[2], "completionDate": t[3].isoformat() if t[3] else None} for t in cur.fetchall()]

            pool.append({
                "id": row[0],
                "name": row[1],
                "email": row[2],
                "profileId": profile_id,
                "specialization": row[4] or "Generalist",
                "joinedAt": row[5].isoformat() if row[5] else None,
                "attritionRisk": row[6] or "LOW",
                "skills": skills,
                "trainings": trainings,
            })
        return pool


def get_ai_recommendations(manager_id):
    """Get AI-powered candidate recommendations from talent pool using Gemini."""
    conn = get_connection()
    with conn.cursor() as cur:
        # Get manager's projects
        cur.execute('''
            SELECT p.id, p.name, p.description, p.status, p."requiredSkills"
            FROM "Project" p
            WHERE p."managerId" = %s
        ''', (manager_id,))
        projects = [{
            "id": row[0],
            "name": row[1],
            "description": row[2] or "",
            "status": row[3],
            "requiredSkills": row[4] or []
        } for row in cur.fetchall()]

        # Get manager's current team members and their skills
        cur.execute('''
            SELECT u.id, u.name, u.email, ep.specialization
            FROM "User" u
            JOIN "EmployeeProfile" ep ON ep."userId" = u.id
            JOIN "Team" t ON t.id = ep."teamId"
            WHERE t."leadId" = %s OR ep."teamId" IN (
                SELECT t2.id FROM "Team" t2 WHERE t2."leadId" = %s
            )
        ''', (manager_id, manager_id))
        team_members = []
        for row in cur.fetchall():
            user_id = row[0]
            cur.execute('''
                SELECT "skillName", proficiency
                FROM "EmployeeSkill"
                WHERE "profileId" = (SELECT id FROM "EmployeeProfile" WHERE "userId" = %s)
            ''', (user_id,))
            skills = [{"skillName": s[0], "proficiency": s[1]} for s in cur.fetchall()]
            team_members.append({
                "id": row[0],
                "name": row[1],
                "email": row[2],
                "specialization": row[3],
                "skills": skills
            })

    # Get talent pool candidates
    talent_pool = list_talent_pool()

    # Build prompt for Gemini
    prompt = f"""You are an expert technical recruiter helping a manager choose the best candidates from a talent pool.

MANAGER'S PROJECTS:
{json.dumps(projects, indent=2)}

MANAGER'S CURRENT TEAM MEMBERS AND THEIR SKILLS:
{json.dumps(team_members, indent=2)}

TALENT POOL CANDIDATES:
{json.dumps(talent_pool, indent=2)}

TASK:
1. Analyze the projects and identify required skills
2. Analyze the current team's skills and identify gaps
3. Evaluate each talent pool candidate based on:
   - How well their skills match the project requirements
   - How well they fill the team's skill gaps
   - Their trainings and specialization
4. Return the TOP 3 candidates that would be the best fit

Return ONLY a JSON array with this exact structure:
[
  {{
    "userId": "candidate_user_id",
    "name": "Candidate Name",
    "reasoning": "Brief explanation of why this candidate is recommended (2-3 sentences)"
  }},
  ...
]
"""

    # Call Gemini API
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")

    from google import genai
    from google.genai import types
    
    client = genai.Client(api_key=api_key)

    try:
        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=[prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        gemini_response = response.text
    except Exception as e:
        logger.error(f"Gemini API error: {str(e)}")
        raise ValueError(f"Gemini API failed: {str(e)}")
    
    # Extract JSON from response (Gemini might wrap it in markdown)
    import re
    json_match = re.search(r'\[.*\]', gemini_response, re.DOTALL)
    if json_match:
        recommendations = json.loads(json_match.group(0))
    else:
        # Fallback: try to parse entire response as JSON
        recommendations = json.loads(gemini_response)

    return {
        "recommendations": recommendations,
        "talentPool": talent_pool,
        "projects": projects,
        "teamSkills": team_members
    }


def add_talent_pool_employee(data):
    """Add a new employee to the talent pool."""
    conn = get_connection()
    with conn.cursor() as cur:
        user_id = str(uuid.uuid4())
        profile_id = str(uuid.uuid4())
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        specialization = data.get("specialization", "Generalist").strip()
        skills = data.get("skills", [])
        trainings = data.get("trainings", [])

        if not name or not email:
            raise ValueError("name and email are required")

        # Default password hash (same as seeded users)
        password_hash = "$pbkdf2-sha256$29000$BiAkJGRsbY3ROse4F0IoxQ$TTebbcn9zLevFlRvJ6MU9p5qfka4jbM//oEeCVbWeWA"

        cur.execute(
            'INSERT INTO "User" (id, email, "passwordHash", name, role, "createdAt") VALUES (%s, %s, %s, %s, %s, NOW())',
            (user_id, email, password_hash, name, 'EMPLOYEE')
        )
        cur.execute(
            'INSERT INTO "EmployeeProfile" (id, "userId", "teamId", "projectId", specialization, "joinedAt", "updatedAt", "performanceRating", "promotionReady", "attritionRisk") VALUES (%s, %s, NULL, NULL, %s, NOW(), NOW(), NULL, false, %s)',
            (profile_id, user_id, specialization, 'LOW')
        )

        for skill in skills:
            skill_name = skill.get("skillName", "").strip()
            proficiency = float(skill.get("proficiency", 3.0))
            if skill_name:
                cur.execute(
                    'INSERT INTO "EmployeeSkill" (id, "skillName", proficiency, "profileId") VALUES (%s, %s, %s, %s)',
                    (str(uuid.uuid4()), skill_name, proficiency, profile_id)
                )

        for training in trainings:
            t_name = training.get("name", "").strip()
            t_desc = training.get("description", "").strip()
            if t_name:
                cur.execute(
                    'INSERT INTO "Training" (id, name, description, "completionDate", "profileId") VALUES (%s, %s, %s, NOW(), %s)',
                    (str(uuid.uuid4()), t_name, t_desc, profile_id)
                )

        conn.commit()
        return {"status": "success", "id": user_id, "profileId": profile_id, "name": name, "email": email}


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
        method = event.get("httpMethod") or event.get("requestContext", {}).get("http", {}).get("method", "GET")
        
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

        if method == "GET" and "manager" in parts and parts[-1] != "actions":
            manager_id = parts[-1]
            result = get_manager_engineers(manager_id)
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

        if method == "POST" and "actions" in parts:
            body = json.loads(event.get("body", "{}"))
            action = body.get("action")
            manager_id = body.get("managerId")
            user_id = body.get("userId")

            if not manager_id or not user_id or not action:
                return {
                    "statusCode": 400,
                    "headers": headers,
                    "body": json.dumps({"error": "managerId, userId, and action are required"})
                }

            if action == "suspend":
                result = suspend_engineer(manager_id, user_id)
            elif action == "review":
                rating = body.get("rating")
                comments = body.get("comments", "")
                if rating is None:
                    raise ValueError("rating is required")
                result = add_performance_review(manager_id, user_id, float(rating), comments)
            elif action == "remove_project":
                result = remove_from_project(manager_id, user_id)
            elif action == "assign_project":
                project_id = body.get("projectId")
                if not project_id:
                    raise ValueError("projectId is required")
                result = assign_to_project(manager_id, user_id, project_id)
            elif action == "remove_team":
                result = remove_from_team(manager_id, user_id)
            elif action == "unsuspend":
                result = unsuspend_engineer(manager_id, user_id)
            elif action == "promote":
                result = promote_engineer(manager_id, user_id)
            else:
                return {
                    "statusCode": 400,
                    "headers": headers,
                    "body": json.dumps({"error": f"Unknown action: {action}"})
                }

            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

        # POST /recruit — recruit from talent pool
        if "recruit" in parts and method == "POST":
            body = json.loads(event.get("body", "{}"))
            manager_id = body.get("managerId")
            user_id = body.get("userId")
            project_id = body.get("projectId")
            if not manager_id or not user_id or not project_id:
                return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "managerId, userId, projectId required"})}
            result = recruit_from_talent_pool(manager_id, user_id, project_id)
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

        # GET /manager-projects/{managerId}
        if "manager-projects" in parts:
            mgr_id = parts[-1]
            result = get_manager_projects(mgr_id)
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

        # GET /talent-pool or POST /talent-pool
        if "talent-pool" in parts:
            if method == "POST":
                body = json.loads(event.get("body", "{}"))
                result = add_talent_pool_employee(body)
                return {"statusCode": 201, "headers": headers, "body": json.dumps(result, default=str)}
            result = list_talent_pool()
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

        # POST /ai-recommendations
        if method == "POST" and "ai-recommendations" in parts:
            body = json.loads(event.get("body", "{}"))
            manager_id = body.get("managerId")
            if not manager_id:
                return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "managerId required"})}
            try:
                result = get_ai_recommendations(manager_id)
                return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}
            except ValueError as e:
                return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": str(e)})}
            except Exception as e:
                import traceback
                error_trace = traceback.format_exc()
                logger.error(f"AI recommendation error: {str(e)}\n{error_trace}")
                return {"statusCode": 500, "headers": headers, "body": json.dumps({"error": "Failed to get recommendations", "detail": str(e), "traceback": error_trace})}

        # GET /all-managers (HR manager database view)
        if "all-managers" in parts:
            result = list_all_managers()
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

        # GET /all-engineers (HR database view)
        if "all-engineers" in parts:
            result = list_all_engineers()
            return {"statusCode": 200, "headers": headers, "body": json.dumps(result, default=str)}

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

    except ValueError as e:
        logger.error("Employees validation error: %s", str(e))
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Invalid request", "message": str(e)})
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

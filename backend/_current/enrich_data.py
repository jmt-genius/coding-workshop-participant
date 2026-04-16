import asyncio
import uuid
import random
from datetime import datetime, timedelta
from database import db, connect_db, disconnect_db

async def enrich():
    await connect_db()
    
    print("Fetching active entities...")
    projects = await db.project.find_many()
    users = await db.user.find_many(where={"role": "EMPLOYEE"}, include={"profile": True})
    teams = await db.team.find_many()
    
    if not teams:
        print("No teams found. Creating a default team...")
        manager = await db.user.find_first(where={"role": "MANAGER"})
        if manager:
            alpha = await db.team.create(data={"name": "Alpha Squad", "leadId": manager.id})
            teams = [alpha]

    # 1. Link Projects to Teams if empty
    print(f"Enriching {len(projects)} projects with milestones...")
    for proj in projects:
        # Assign to a team if not assigned
        if not proj.teamId and teams:
            team = random.choice(teams)
            await db.project.update(where={"id": proj.id}, data={"teamId": team.id})
        
        # Add 2 Milestones per Project
        existing_milestones = await db.milestone.find_many(where={"projectId": proj.id})
        if len(existing_milestones) < 2:
            # Achieved Milestone
            await db.milestone.create(data={
                "projectId": proj.id,
                "title": f"Phase 1: Initial Architecture",
                "description": "Establish core infrastructure and design system tokens.",
                "duration": "2 weeks",
                "impact": 8.5,
                "isAchieved": True,
                "date": datetime.now() - timedelta(days=14)
            })
            # Pending Milestone
            await db.milestone.create(data={
                "projectId": proj.id,
                "title": f"Phase 2: Production Readiness",
                "description": "Full E2E test coverage and security audit.",
                "duration": "1 month",
                "impact": 9.2,
                "isAchieved": False,
                "date": datetime.now() + timedelta(days=20)
            })

    # 2. Add historical data for Users to fix empty UI
    print(f"Generating performance history for {len(users)} engineers...")
    for user in users:
        # Generate some Commits
        commit_count = await db.commit.count(where={"userId": user.id})
        if commit_count < 10:
            for i in range(12):
                proj = random.choice(projects) if projects else None
                await db.commit.create(data={
                    "hash": str(uuid.uuid4())[:8],
                    "message": f"Refactor: Optimize module {i}",
                    "impact": random.uniform(0.5, 2.0),
                    "userId": user.id,
                    "projectId": proj.id if proj else None,
                    "createdAt": datetime.now() - timedelta(days=random.randint(1, 30))
                })
        
        # Generate some closed Tickets
        ticket_count = await db.ticket.count(where={"assigneeId": user.id, "status": "CLOSED"})
        if ticket_count < 5:
            for i in range(8):
                proj = random.choice(projects) if projects else None
                await db.ticket.create(data={
                    "title": f"Fix: CSS alignment bug {i}",
                    "status": "CLOSED",
                    "difficulty": random.uniform(1, 5),
                    "projectId": proj.id if proj else None,
                    "assigneeId": user.id,
                    "openedById": user.id, # simplified
                    "closedById": user.id,
                    "closedAt": datetime.now() - timedelta(days=random.randint(1, 15))
                })

        # Generate Project History to fix the profile page
        history_count = await db.projecthistory.count(where={"userId": user.id})
        if history_count == 0 and projects:
            past_proj = projects[0]
            await db.projecthistory.create(data={
                "userId": user.id,
                "projectId": past_proj.id,
                "role": "Lead Architect" if "Lead" in user.name else "Fullstack Engineer",
                "startDate": datetime.now() - timedelta(days=365),
                "endDate": datetime.now() - timedelta(days=180)
            })
            if len(projects) > 1:
                curr_proj = projects[1]
                await db.projecthistory.create(data={
                    "userId": user.id,
                    "projectId": curr_proj.id,
                    "role": "Senior Developer",
                    "startDate": datetime.now() - timedelta(days=170)
                })

    print("Data enrichment complete!")
    await disconnect_db()

if __name__ == "__main__":
    asyncio.run(enrich())

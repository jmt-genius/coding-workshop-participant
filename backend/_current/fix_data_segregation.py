import asyncio
import random
import uuid
from datetime import datetime, timedelta
from database import db, connect_db, disconnect_db

async def fix_segregation():
    await connect_db()
    
    print("Partitioning projects by team...")
    teams = await db.team.find_many()
    projects = await db.project.find_many()
    
    # 1. Strictly assign projects to teams (No overlapping)
    # Ensure every project has exactly one team or none
    random.shuffle(projects)
    for i, proj in enumerate(projects):
        if i < len(teams) * 2: # Give each team 2 projects
            target_team = teams[i % len(teams)]
            await db.project.update(where={"id": proj.id}, data={"teamId": target_team.id})
        else:
            await db.project.update(where={"id": proj.id}, data={"teamId": None})

    # 2. Rebuild milestones (Clear and create 2 per project)
    print("Rebuilding milestones...")
    await db.milestone.delete_many({}) # Dangerous but necessary for strict segregation
    
    assigned_projects = await db.project.find_many(where={"NOT": {"teamId": None}})
    for proj in assigned_projects:
        # Achieved
        await db.milestone.create(data={
            "projectId": proj.id,
            "title": f"Phase 1: {proj.name} Launch",
            "description": "Core architecture established and verified.",
            "duration": "14 Days",
            "impact": random.uniform(8.0, 9.5),
            "isAchieved": True,
            "date": datetime.now() - timedelta(days=20)
        })
        # Pending
        await db.milestone.create(data={
            "projectId": proj.id,
            "title": f"Phase 2: {proj.name} Optimization",
            "description": "Scaling throughput and reducing latency lag.",
            "duration": "3 Weeks",
            "impact": random.uniform(8.5, 9.8),
            "isAchieved": False,
            "date": datetime.now() + timedelta(days=15)
        })

    # 3. Boost Engineer Scores (Mostly above 5.0)
    print("Boosting engineer performance data...")
    users = await db.user.find_many(where={"role": "EMPLOYEE"})
    for user in users:
        # Check current counts
        commits = await db.commit.count(where={"userId": user.id})
        if commits < 15:
            for _ in range(20):
                await db.commit.create(data={
                    "hash": str(uuid.uuid4())[:8].upper(),
                    "message": "Optimization: Refactor core logic",
                    "impact": random.uniform(1.0, 2.5),
                    "userId": user.id,
                    "createdAt": datetime.now() - timedelta(days=random.randint(1, 30))
                })
        
        tickets = await db.ticket.count(where={"assigneeId": user.id, "status": "CLOSED"})
        if tickets < 10:
            for _ in range(12):
                await db.ticket.create(data={
                    "title": "Fix: Production bug resoltuion",
                    "status": "CLOSED",
                    "difficulty": random.uniform(2, 5),
                    "assigneeId": user.id,
                    "openedById": user.id,
                    "closedAt": datetime.now() - timedelta(days=random.randint(1, 10))
                })
        
        # Ensure low bugs for 80% of users
        if random.random() < 0.8:
            await db.bug.delete_many(where={"ownerId": user.id})

    print("Data segregation and enrichment complete!")
    await disconnect_db()

if __name__ == "__main__":
    asyncio.run(fix_segregation())

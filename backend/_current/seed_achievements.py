import asyncio
import random
from datetime import datetime, timedelta
from database import db, connect_db, disconnect_db

async def seed_achievements():
    await connect_db()
    
    print("Fetching existing teams...")
    teams = await db.team.find_many(include={"achievements": True})
    
    achievement_pool = [
        {"title": "Uptime Excellence", "description": "Maintained 99.9% availability across all managed cluster nodes for 30 days."},
        {"title": "Sprint Velocity Leader", "description": "Exceeded projected delivery targets by 15% in the previous performance cycle."},
        {"title": "Zero-Bug Deployment", "description": "Successfully deployed major feature updates with zero critical bugs reported in production."},
        {"title": "Security Guardian", "description": "Identified and patched 12 high-risk vulnerabilities during the internal audit phase."},
        {"title": "Legacy Refactor King", "description": "Successfully migrated 50% of technical debt into modernized architecture patterns."},
        {"title": "Unit Test Standard", "description": "Achieved 95% test coverage across the entire project codebase."},
        {"title": "Feature Impact Award", "description": "Delivered features that directly increased user engagement metrics by 25%."}
    ]
    
    for team in teams:
        print(f"Enriching achievements for {team.name}...")
        # Add achievements if they have less than 2
        needed = 2 - len(team.achievements)
        if needed > 0:
            random.shuffle(achievement_pool)
            for i in range(needed):
                ach = achievement_pool[i]
                await db.achievement.create(data={
                    "teamId": team.id,
                    "title": ach["title"],
                    "description": ach["description"],
                    "date": datetime.now() - timedelta(days=random.randint(1, 60))
                })
                print(f" - Added: {ach['title']}")
        else:
            print(f" - Team already has {len(team.achievements)} achievements.")

    print("Achievement enrichment complete!")
    await disconnect_db()

if __name__ == "__main__":
    asyncio.run(seed_achievements())

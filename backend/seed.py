import asyncio
from database import db, connect_db, disconnect_db

async def seed():
    await connect_db()
    
    # 1. Create Users
    hr = await db.user.upsert(
        where={"email": "hr@luminous.com"},
        data={
            "create": {"email": "hr@luminous.com", "name": "HR Director", "role": "HR"},
            "update": {"role": "HR"}
        }
    )
    
    manager = await db.user.upsert(
        where={"email": "manager@luminous.com"},
        data={
            "create": {"email": "manager@luminous.com", "name": "Team Lead", "role": "MANAGER"},
            "update": {"role": "MANAGER"}
        }
    )
    
    employee = await db.user.upsert(
        where={"email": "user@luminous.com"},
        data={
            "create": {"email": "user@luminous.com", "name": "Lead Engineer", "role": "EMPLOYEE"},
            "update": {"role": "EMPLOYEE"}
        }
    )
    
    # 2. Create Teams
    alpha = await db.team.upsert(
        where={"name": "Alpha Squad"},
        data={
            "create": {"name": "Alpha Squad", "leadId": manager.id},
            "update": {"leadId": manager.id}
        }
    )
    
    # 3. Create Employee Profiles with Metrics
    await db.employeeprofile.upsert(
        where={"userId": employee.id},
        data={
            "create": {
                "userId": employee.id,
                "teamId": alpha.id,
                "bugRate": 0.4,
                "commitsCount": 128,
                "ticketsClosed": 42,
                "featureImpact": 88.5
            },
            "update": {
                "teamId": alpha.id,
                "bugRate": 0.4,
                "commitsCount": 128,
                "ticketsClosed": 42,
                "featureImpact": 88.5
            }
        }
    )

    print("Database seeded successfully!")
    await disconnect_db()

if __name__ == "__main__":
    asyncio.run(seed())

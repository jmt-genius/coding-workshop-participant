import asyncio
import random
import uuid
import datetime
from database import db, connect_db, disconnect_db
from main import get_password_hash

async def populate():
    await connect_db()
    
    password = get_password_hash("Tarun2004")
    print("Clearing existing data...")
    # Clean up existing data manually if prisma db push --force-reset didn't clear everything
    
    # 1. Create Core HR Admin
    hr = await db.user.upsert(
        where={"email": "hr@luminous.com"},
        data={
            "create": {"email": "hr@luminous.com", "name": "Sarah Chen", "role": "HR", "passwordHash": password},
            "update": {"passwordHash": password, "name": "Sarah Chen"}
        }
    )
    
    # 2. Create 10 Managers and 10 Teams
    team_definitions = [
        {"name": "Product Engineering", "manager": "Marcus Thorne", "email": "manager1@luminous.com"},
        {"name": "DevOps", "manager": "Elena Rodriguez", "email": "manager2@luminous.com"},
        {"name": "Hardware", "manager": "Silas Vance", "email": "manager3@luminous.com"},
        {"name": "Quality Assurance", "manager": "Maya Okafor", "email": "manager4@luminous.com"},
        {"name": "Security Operations", "manager": "Kaelen Voss", "email": "manager5@luminous.com"},
        {"name": "Infrastructure", "manager": "Jaxon Reed", "email": "manager6@luminous.com"},
        {"name": "Data Science", "manager": "Aria Sterling", "email": "manager7@luminous.com"},
        {"name": "Mobile Development", "manager": "Leo Castellan", "email": "manager8@luminous.com"},
        {"name": "Site Reliability", "manager": "Nadia Volkov", "email": "manager9@luminous.com"},
        {"name": "Product Design", "manager": "Julian Cross", "email": "manager10@luminous.com"},
    ]
    
    managers = []
    teams = []
    for td in team_definitions:
        m = await db.user.upsert(
            where={"email": td["email"]},
            data={
                "create": {"email": td["email"], "name": td["manager"], "role": "MANAGER", "passwordHash": password},
                "update": {"passwordHash": password, "name": td["manager"]}
            }
        )
        t = await db.team.upsert(
            where={"name": td["name"]},
            data={
                "create": {"name": td["name"], "leadId": m.id},
                "update": {"leadId": m.id}
            }
        )
        managers.append(m)
        teams.append(t)

    # 3. Create Projects (2 per team)
    projects = []
    tech_stacks = ["React", "TypeScript", "Node.js", "Python", "SQL", "AWS", "Mobile", "Tailwind", "Docker", "Kubernetes", "C++", "Rust"]
    
    for i, t in enumerate(teams):
        m = managers[i]
        for j in range(2):
            proj_name = f"{t.name} Initiative {j+1}"
            proj = await db.project.upsert(
                where={"name": proj_name},
                data={
                    "create": {
                        "name": proj_name,
                        "description": f"Critical development for {t.name} department.",
                        "requiredSkills": random.sample(tech_stacks, 3),
                        "managerId": m.id,
                        "status": "ACTIVE"
                    },
                    "update": {"managerId": m.id}
                }
            )
            projects.append(proj)

    # 4. Create 50 Employees
    names = [
        "Alex Rivera", "Jordan Smith", "Taylor Reed", "Morgan Page", "Casey Vlogs", "Jamie Lan", 
        "Riley West", "Dakota Skye", "Peyton Manning", "Skyler Blue", "Quinn Fabray", "Avery Brooks",
        "Charlie Day", "Blake Lively", "Drew Berry", "Logan Paul", "Sasha Banks", "Reese Spoon", 
        "Emery Stone", "Parker Posey", "Hayden Pan", "Finley Faith", "Justice Moore", "Remi Gaillard",
        "Sam Winchester", "Dean Howell", "Castiel Novak", "Bobby Singer", "Ellen Harvelle", "Jo Beth",
        "Ruby Rose", "Bela Talbot", "Gabriel Arch", "Lucifer Morning", "Crowley King", "Rowena Mac",
        "Kevin Tran", "Charlie Bradbury", "Jody Mills", "Donna Hans", "Claire Novak", "Kaia Nieves",
        "Eileen Leahy", "Meg Masters", "Ash Miles", "Garth Fitz", "Benny Lafitte", "Jack Kline",
        "Amara Dark", "Chuck Shurley"
    ]
    
    training_courses = ["Advanced React Patterns", "AWS Cloud Practitioner", "Agile Methodologies", "Python for Data Science", "OWASP Security Training", "System Architecture Mastery"]

    employee_users = []
    for i, name in enumerate(names):
        email = f"user{i+1}@luminous.com"
        user = await db.user.upsert(
            where={"email": email},
            data={
                "create": {
                    "email": email, 
                    "name": name, 
                    "role": "EMPLOYEE", 
                    "passwordHash": password
                },
                "update": {"passwordHash": password}
            }
        )
        employee_users.append(user)
        
        team = teams[i % len(teams)]
        # Lead manager of the team
        current_manager = managers[i % len(teams)]
        # Filter projects for this manager
        manager_projects = [p for p in projects if p.managerId == current_manager.id]
        project = random.choice(manager_projects) if manager_projects else projects[0]
        
        rating = round(random.uniform(2.5, 4.8), 1)
        profile = await db.employeeprofile.upsert(
            where={"userId": user.id},
            data={
                "create": {
                    "userId": user.id, 
                    "teamId": team.id, 
                    "projectId": project.id,
                    "specialization": random.choice(["Frontend Engineer", "Backend Engineer", "Data Scientist", "DevOps Engineer", "Hardware Specialist", "Security Analyst"]),
                    "performanceRating": rating,
                    "promotionReady": rating >= 4.5,
                    "attritionRisk": "HIGH" if rating < 3.0 else ("MEDIUM" if rating < 3.8 else "LOW")
                },
                "update": {
                    "teamId": team.id,
                    "projectId": project.id,
                    "performanceRating": rating
                }
            }
        )
        
        # Skills & Training (10+ implies depth)
        for skill in random.sample(tech_stacks, random.randint(3, 6)):
             await db.employeeskill.create(data={"skillName": skill, "proficiency": round(random.uniform(2.0, 5.0), 1), "profileId": profile.id})
        
        for training in random.sample(training_courses, random.randint(1, 3)):
            await db.training.create(data={"name": training, "description": "Enterprise certified.", "profileId": profile.id, "completionDate": datetime.datetime.now()})

        # Logs (10+ per table as requested)
        # 1. Commits
        for _ in range(random.randint(10, 20)):
            await db.commit.create(
                data={
                    "hash": str(uuid.uuid4())[:8].upper(),
                    "message": f"Refactored {project.name} core modules",
                    "impact": random.uniform(0.5, 2.0),
                    "userId": user.id,
                    "projectId": project.id
                }
            )
            
        # 2. Tickets
        for _ in range(random.randint(10, 15)):
            status = random.choice(["CLOSED", "OPEN"])
            await db.ticket.create(
                data={
                    "title": f"JIRA-{random.randint(1000, 9999)}: API Integration",
                    "status": status,
                    "difficulty": random.uniform(1.0, 5.0),
                    "projectId": project.id,
                    "assigneeId": user.id,
                    "openedById": current_manager.id,
                    "closedById": user.id if status == "CLOSED" else None,
                    "closedAt": datetime.datetime.now() if status == "CLOSED" else None
                }
            )
            
        # 3. Bugs
        for _ in range(random.randint(5, 10)):
            status = random.choice(["CLOSED", "OPEN"])
            await db.bug.create(
                data={
                    "title": f"Regression in {project.name} build",
                    "severity": random.choice(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
                    "status": status,
                    "projectId": project.id,
                    "reporterId": hr.id if random.random() > 0.5 else current_manager.id,
                    "ownerId": user.id,
                    "resolverId": user.id if status == "CLOSED" else None
                }
            )

    print(f"Successfully seeded {len(teams)} teams, {len(managers)} managers, and {len(employee_users)} employees with project-specific logs!")
    await disconnect_db()

if __name__ == "__main__":
    asyncio.run(populate())

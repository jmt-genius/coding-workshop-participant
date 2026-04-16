from fastapi import FastAPI, HTTPException, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict
from pydantic import BaseModel
from database import db, connect_db, disconnect_db
from contextlib import asynccontextmanager
from passlib.context import CryptContext
import uvicorn
import uuid
import datetime

# Password Hashing
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await disconnect_db()

def calculate_performance_rating(tickets: int, commits: int, bugs: int) -> float:
    # Baseline 4.2, carefully tuned for 4.0 - 9.5 range
    score = 4.2 + (tickets * 0.2) + (commits * 0.04) - (bugs * 0.4)
    return round(max(1.0, min(10.0, score)), 1)

app = FastAPI(title="Luminous Noir Executive Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class UserLogin(BaseModel):
    email: str
    password: str

class CommitLog(BaseModel):
    userId: str
    projectId: str
    message: str
    impact: float = 1.0

class TicketLog(BaseModel):
    title: str
    status: str = "CLOSED"
    difficulty: float = 1.0
    projectId: str
    assigneeId: Optional[str] = None
    openedById: str
    closedById: Optional[str] = None

class BugLog(BaseModel):
    title: str
    severity: str
    status: str = "OPEN"
    projectId: str
    reporterId: str
    ownerId: Optional[str] = None
    resolverId: Optional[str] = None

# --- Endpoints ---

@app.post("/auth/login")
async def login(data: UserLogin):
    user = await db.user.find_unique(where={"email": data.email})
    if not user or not verify_password(data.password, user.passwordHash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "id": user.id,
        "email": user.email,
        "name": user.name,
        "role": user.role
    }

@app.get("/analytics/squad/{team_id}")
async def get_squad_analytics(team_id: str):
    # Fetch team and members
    team = await db.team.find_unique(
        where={"id": team_id},
        include={
            "members": {"include": {"user": True}},
            "achievements": True
        }
    )
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    member_stats = []
    total_squad_score = 0
    
    for member in team.members:
        user_id = member.user.id
        commits = await db.commit.count(where={"userId": user_id})
        tickets = await db.ticket.count(where={"assigneeId": user_id, "status": "CLOSED"})
        bugs = await db.bug.count(where={"ownerId": user_id})
        
        # Calculate individual score on 1.0-10.0 scale
        score = calculate_performance_rating(tickets, commits, bugs)
        total_squad_score += score
        
        member_stats.append({
            "id": user_id,
            "name": member.user.name,
            "score": round(score, 1),
            "commits": commits,
            "tickets": tickets,
            "bugs": bugs
        })

    avg_score = total_squad_score / len(team.members) if team.members else 0

    # EXPLICIT Filter: Fetch ONLY projects strictly assigned to this team
    projects = await db.project.find_many(
        where={"teamId": team_id},
        include={"milestones": True}
    )
    
    all_milestones = []
    for project in projects:
        for ms in project.milestones:
            all_milestones.append({
                "id": ms.id,
                "projectId": ms.projectId,
                "projectName": project.name,
                "title": ms.title,
                "description": ms.description,
                "duration": ms.duration,
                "impact": ms.impact,
                "isAchieved": ms.isAchieved,
                "date": ms.date
            })

    return {
        "teamName": team.name,
        "averagePerformance": round(avg_score, 1),
        "memberBreakdown": member_stats,
        "achievements": team.achievements,
        "milestones": all_milestones
    }

@app.get("/analytics/global")
async def get_global_analytics():
    teams = await db.team.find_many(include={"members": {"include": {"user": True}}})
    users = await db.user.find_many(where={"role": "EMPLOYEE"}, include={"profile": {"include": {"employeeSkills": True}}})
    
    total_commits = await db.commit.count()
    total_tickets = await db.ticket.count(where={"status": "CLOSED"})
    total_bugs = await db.bug.count()
    
    team_rankings = []
    for team in teams:
        team_score = 0
        if team.members:
            for member in team.members:
                user_id = member.user.id
                c = await db.commit.count(where={"userId": user_id})
                t = await db.ticket.count(where={"assigneeId": user_id, "status": "CLOSED"})
                b = await db.bug.count(where={"ownerId": user_id})
                team_score += calculate_performance_rating(t, c, b)
            team_score = team_score / len(team.members)
        
        team_rankings.append({
            "name": team.name,
            "score": round(team_score, 1),
            "memberCount": len(team.members)
        })
        
    promotions = sum(1 for u in users if u.profile and u.profile.promotionReady)
    high_attrition = sum(1 for u in users if u.profile and u.profile.attritionRisk == "HIGH")
    
    # Skill distribution
    from collections import Counter
    skill_counter = Counter()
    for u in users:
        if u.profile and u.profile.employeeSkills:
            for s in u.profile.employeeSkills:
                skill_counter[s.skillName] += 1

    return {
        "activeEngineers": len(users),
        "totalTeams": len(teams),
        "teamRankings": sorted(team_rankings, key=lambda x: x["score"], reverse=True),
        "aggregateMetrics": {
            "velocity": total_tickets,
            "activity": total_commits,
            "qualityRisk": total_bugs
        },
        "hrMetrics": {
            "promotionReady": promotions,
            "highAttritionRisk": high_attrition,
            "skillDistribution": [{"skill": k, "count": v} for k, v in skill_counter.most_common(5)]
        }
    }

@app.get("/projects/manager/{manager_id}")
async def get_manager_projects(manager_id: str):
    projects = await db.project.find_many(
        where={"managerId": manager_id},
        include={
            "currentEngineers": {
                "include": {
                    "user": True,
                    "employeeSkills": True
                }
            }
        }
    )
    
    result = []
    for p in projects:
        engineers_stats = []
        for eng in p.currentEngineers:
            user_id = eng.userId
            
            # Project-specific counts
            commits = await db.commit.count(where={"userId": user_id, "projectId": p.id})
            tickets = await db.ticket.count(where={"assigneeId": user_id, "projectId": p.id, "status": "CLOSED"})
            bugs = await db.bug.count(where={"ownerId": user_id, "projectId": p.id, "status": "OPEN"})
            
            eng_skills = [s.skillName for s in eng.employeeSkills] if eng.employeeSkills else []
            has_gap = any(req not in eng_skills for req in p.requiredSkills) if p.requiredSkills else False
            
            engineers_stats.append({
                "id": user_id,
                "name": eng.user.name,
                "role": eng.specialization,
                "skills": eng_skills,
                "hasSkillGap": has_gap,
                "performanceRating": eng.performanceRating,
                "metrics": {
                    "commits": commits,
                    "tickets": tickets,
                    "bugs": bugs
                }
            })
            
        result.append({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "status": p.status,
            "requiredSkills": p.requiredSkills,
            "engineers": engineers_stats,
            "totalCommits": await db.commit.count(where={"projectId": p.id}),
            "totalTickets": await db.ticket.count(where={"projectId": p.id, "status": "CLOSED"}),
            "totalBugs": await db.bug.count(where={"projectId": p.id, "status": "OPEN"})
        })
        
    return result

@app.get("/employees")
async def list_employees():
    users = await db.user.find_many(
        where={"role": "EMPLOYEE"},
        include={
            "profile": {
                "include": {
                    "team": True
                }
            }
        }
    )
    return users

@app.get("/employees/{user_id}")
async def get_employee_detail(user_id: str):
    user = await db.user.find_unique(
        where={"id": user_id},
        include={
            "profile": {
                "include": {
                    "employeeSkills": True,
                    "trainings": True,
                    "project": True,
                    "team": True
                }
            },
            "performanceReviews": True,
            "projectHistory": {
                "include": {
                    "project": True
                }
            }
        }
    )
    
    if not user:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    # Also calculate global metrics for this user
    total_commits = await db.commit.count(where={"userId": user_id})
    total_tickets = await db.ticket.count(where={"assigneeId": user_id, "status": "CLOSED"})
    total_bugs = await db.bug.count(where={"ownerId": user_id})
    rating = calculate_performance_rating(total_tickets, total_commits, total_bugs)

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "profile": user.profile,
        "performanceReviews": sorted(user.performanceReviews, key=lambda x: x.date, reverse=True) if user.performanceReviews else [],
        "projectHistory": sorted(user.projectHistory, key=lambda x: x.endDate or x.startDate, reverse=True) if user.projectHistory else [],
        "stats": {
            "commits": total_commits,
            "tickets": total_tickets,
            "bugs": total_bugs,
            "rating": rating
        }
    }

@app.post("/logs/commit")
async def log_commit(data: CommitLog):
    return await db.commit.create(
        data={
            "hash": str(uuid.uuid4())[:8].upper(),
            "message": data.message,
            "impact": data.impact,
            "userId": data.userId,
            "projectId": data.projectId
        }
    )

@app.post("/logs/ticket")
async def log_ticket(data: TicketLog):
    return await db.ticket.create(
        data={
            "title": data.title,
            "status": data.status,
            "difficulty": data.difficulty,
            "projectId": data.projectId,
            "assigneeId": data.assigneeId,
            "openedById": data.openedById,
            "closedById": data.closedById,
            "closedAt": datetime.datetime.now() if data.status == "CLOSED" else None
        }
    )

@app.post("/logs/bug")
async def log_bug(data: BugLog):
    return await db.bug.create(
        data={
            "title": data.title,
            "severity": data.severity,
            "status": data.status,
            "projectId": data.projectId,
            "reporterId": data.reporterId,
            "ownerId": data.ownerId,
            "resolverId": data.resolverId
        }
    )

@app.get("/teams")
async def get_teams(leadId: Optional[str] = None):
    if leadId:
        return await db.team.find_many(where={"leadId": leadId})
    return await db.team.find_many()

@app.get("/users")
async def list_users():
    return await db.user.find_many()

class MetricsUpdate(BaseModel):
    userId: str
    metrics: Dict[str, float]

@app.post("/employees/metrics")
async def update_metrics(data: MetricsUpdate):
    # In a real app, we'd update a metrics table. 
    # Here we'll just update the performanceRating based on the new logic as a proxy.
    user = await db.user.find_unique(where={"id": data.userId}, include={"profile": True})
    if not user or not user.profile:
        raise HTTPException(status_code=404, detail="Employee profile not found")
    
    # Simple simulation of updating the rating
    new_rating = data.metrics.get("featureImpact", 1.0) * 2 + 3.0 # Fake logic for demo
    await db.employeeprofile.update(
        where={"id": user.profile.id},
        data={"performanceRating": round(new_rating, 1)}
    )
    return {"status": "success", "rating": round(new_rating, 1)}

class TeamCreate(BaseModel):
    name: str
    leadId: str

@app.post("/teams")
async def create_team(data: TeamCreate):
    return await db.team.create(
        data={
            "name": data.name,
            "leadId": data.leadId
        }
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

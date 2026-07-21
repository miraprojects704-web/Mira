from __future__ import annotations

from datetime import datetime, timedelta, timezone

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import get_settings
from app.core.security import get_password_hash
from app.models.user import User
from app.models.vision import Vision
from app.models.journey import Journey
from app.models.goal import Goal
from app.models.project import Project
from app.models.task import Task


def seed_database() -> None:
    settings = get_settings()
    engine = create_engine(
        settings.database_url,
        connect_args={"check_same_thread": False} if "sqlite" in settings.database_url else {},
    )
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()

    try:
        # Create test user if not exists
        test_user = db.query(User).filter(User.email == "demo@mira.local").first()
        if not test_user:
            test_user = User(
                email="demo@mira.local",
                username="demo",
                hashed_password=get_password_hash("demo123"),
                full_name="Demo User",
            )
            db.add(test_user)
            db.commit()
            db.refresh(test_user)
            print(f"✓ Created user: {test_user.email}")

        # Create vision
        vision = db.query(Vision).filter(Vision.user_id == test_user.id).first()
        if not vision:
            vision = Vision(
                user_id=test_user.id,
                title="Build a life of purpose and impact",
                statement="Create meaningful work that brings value to others while maintaining balance and growth",
                horizon="10 years",
            )
            db.add(vision)
            db.commit()
            db.refresh(vision)
            print(f"✓ Created vision: {vision.title}")

        # Create journeys
        journeys_data = [
            {"title": "Career Growth", "description": "Build expertise in software engineering and leadership"},
            {"title": "Personal Health", "description": "Establish sustainable fitness and nutrition habits"},
            {"title": "Learning & Development", "description": "Deepen knowledge in AI, design patterns, and architecture"},
        ]

        journey_objs = []
        for journey_data in journeys_data:
            journey = (
                db.query(Journey)
                .filter(Journey.user_id == test_user.id, Journey.title == journey_data["title"])
                .first()
            )
            if not journey:
                journey = Journey(user_id=test_user.id, **journey_data)
                db.add(journey)
                db.commit()
                db.refresh(journey)
                print(f"✓ Created journey: {journey.title}")
            journey_objs.append(journey)

        # Create goals for each journey
        goals_data = [
            {"journey_id": journey_objs[0].id, "title": "Lead a team", "description": "Develop leadership skills and lead a team of 5+"},
            {"journey_id": journey_objs[0].id, "title": "Master system design", "description": "Deep dive into distributed systems"},
            {"journey_id": journey_objs[1].id, "title": "Run a 5K", "description": "Build cardio fitness"},
            {"journey_id": journey_objs[2].id, "title": "Learn LLMs", "description": "Understand large language models and fine-tuning"},
        ]

        goal_objs = []
        for goal_data in goals_data:
            goal = (
                db.query(Goal)
                .filter(Goal.user_id == test_user.id, Goal.title == goal_data["title"])
                .first()
            )
            if not goal:
                goal = Goal(
                    user_id=test_user.id,
                    target_date=datetime.now(timezone.utc) + timedelta(days=365),
                    **goal_data,
                )
                db.add(goal)
                db.commit()
                db.refresh(goal)
                print(f"✓ Created goal: {goal.title}")
            goal_objs.append(goal)

        # Create projects for goals
        projects_data = [
            {"goal_id": goal_objs[0].id, "title": "Leadership workshop", "description": "Complete management training program"},
            {"goal_id": goal_objs[1].id, "title": "System design course", "description": "Take advanced system design course"},
            {"goal_id": goal_objs[2].id, "title": "Couch to 5K program", "description": "Follow C25K training plan"},
        ]

        project_objs = []
        for project_data in projects_data:
            project = (
                db.query(Project)
                .filter(Project.user_id == test_user.id, Project.title == project_data["title"])
                .first()
            )
            if not project:
                project = Project(
                    user_id=test_user.id,
                    due_date=datetime.now(timezone.utc) + timedelta(days=180),
                    **project_data,
                )
                db.add(project)
                db.commit()
                db.refresh(project)
                print(f"✓ Created project: {project.title}")
            project_objs.append(project)

        # Create tasks
        tasks_data = [
            {"project_id": project_objs[0].id, "title": "Week 1: Leadership fundamentals", "priority": "high"},
            {"project_id": project_objs[0].id, "title": "Week 2: Communication skills", "priority": "high"},
            {"project_id": project_objs[1].id, "title": "Module 1: Scalability basics", "priority": "normal"},
            {"project_id": project_objs[2].id, "title": "Week 1: Run/walk", "priority": "normal"},
        ]

        for task_data in tasks_data:
            task = (
                db.query(Task)
                .filter(Task.user_id == test_user.id, Task.title == task_data["title"])
                .first()
            )
            if not task:
                task = Task(
                    user_id=test_user.id,
                    due_date=datetime.now(timezone.utc) + timedelta(days=7),
                    **task_data,
                )
                db.add(task)
                db.commit()
                db.refresh(task)
                print(f"✓ Created task: {task.title}")

        print("\n✅ Database seeding completed successfully!")

    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

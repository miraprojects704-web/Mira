from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.goal import Goal
from ..repositories.goal_repository import GoalRepository
from ..schemas.goal import GoalCreate, GoalUpdate


class GoalService:
    def __init__(self, repo: GoalRepository | None = None) -> None:
        self.repo = repo or GoalRepository()

    def list_user_goals(self, db: Session, user_id: int) -> list[Goal]:
        return self.repo.get_by_user(db, user_id)

    def get_goal(self, db: Session, goal_id: int) -> Goal | None:
        return self.repo.get(db, goal_id)

    def create_goal(self, db: Session, user_id: int, payload: GoalCreate) -> Goal:
        goal = Goal(
            user_id=user_id,
            journey_id=payload.journey_id,
            title=payload.title,
            description=payload.description,
            target_date=payload.target_date,
        )
        return self.repo.create(db, goal)

    def update_goal(self, db: Session, goal: Goal, payload: GoalUpdate) -> Goal:
        if payload.title is not None:
            goal.title = payload.title
        if payload.description is not None:
            goal.description = payload.description
        if payload.status is not None:
            goal.status = payload.status
        if payload.target_date is not None:
            goal.target_date = payload.target_date
        db.commit()
        db.refresh(goal)
        return goal

    def delete_goal(self, db: Session, goal: Goal) -> None:
        self.repo.delete(db, goal)

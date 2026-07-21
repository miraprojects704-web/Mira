from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.goal import Goal
from .base import RepositoryBase


class GoalRepository(RepositoryBase[Goal]):
    def __init__(self) -> None:
        super().__init__(Goal)

    def get_by_user(self, db: Session, user_id: int) -> list[Goal]:
        return db.query(Goal).filter(Goal.user_id == user_id).all()

    def get_by_journey(self, db: Session, journey_id: int) -> list[Goal]:
        return db.query(Goal).filter(Goal.journey_id == journey_id).all()

from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.project import Project
from .base import RepositoryBase


class ProjectRepository(RepositoryBase[Project]):
    def __init__(self) -> None:
        super().__init__(Project)

    def get_by_user(self, db: Session, user_id: int) -> list[Project]:
        return db.query(Project).filter(Project.user_id == user_id).all()

    def get_by_goal(self, db: Session, goal_id: int) -> list[Project]:
        return db.query(Project).filter(Project.goal_id == goal_id).all()

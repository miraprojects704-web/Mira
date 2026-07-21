from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.task import Task
from .base import RepositoryBase


class TaskRepository(RepositoryBase[Task]):
    def __init__(self) -> None:
        super().__init__(Task)

    def get_by_user(self, db: Session, user_id: int) -> list[Task]:
        return db.query(Task).filter(Task.user_id == user_id).all()

    def get_by_project(self, db: Session, project_id: int) -> list[Task]:
        return db.query(Task).filter(Task.project_id == project_id).all()

    def get_by_goal(self, db: Session, goal_id: int) -> list[Task]:
        return db.query(Task).filter(Task.goal_id == goal_id).all()

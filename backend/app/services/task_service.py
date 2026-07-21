from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.task import Task
from ..repositories.task_repository import TaskRepository
from ..schemas.task import TaskCreate, TaskUpdate


class TaskService:
    def __init__(self, repo: TaskRepository | None = None) -> None:
        self.repo = repo or TaskRepository()

    def list_user_tasks(self, db: Session, user_id: int) -> list[Task]:
        return self.repo.get_by_user(db, user_id)

    def get_task(self, db: Session, task_id: int) -> Task | None:
        return self.repo.get(db, task_id)

    def create_task(self, db: Session, user_id: int, payload: TaskCreate) -> Task:
        task = Task(
            user_id=user_id,
            project_id=payload.project_id,
            goal_id=payload.goal_id,
            title=payload.title,
            details=payload.details,
            priority=payload.priority,
            due_date=payload.due_date,
        )
        return self.repo.create(db, task)

    def update_task(self, db: Session, task: Task, payload: TaskUpdate) -> Task:
        if payload.title is not None:
            task.title = payload.title
        if payload.details is not None:
            task.details = payload.details
        if payload.status is not None:
            task.status = payload.status
        if payload.priority is not None:
            task.priority = payload.priority
        if payload.due_date is not None:
            task.due_date = payload.due_date
        if payload.is_complete is not None:
            task.is_complete = payload.is_complete
        db.commit()
        db.refresh(task)
        return task

    def delete_task(self, db: Session, task: Task) -> None:
        self.repo.delete(db, task)

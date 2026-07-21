from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.project import Project
from ..repositories.project_repository import ProjectRepository
from ..schemas.project import ProjectCreate, ProjectUpdate


class ProjectService:
    def __init__(self, repo: ProjectRepository | None = None) -> None:
        self.repo = repo or ProjectRepository()

    def list_user_projects(self, db: Session, user_id: int) -> list[Project]:
        return self.repo.get_by_user(db, user_id)

    def get_project(self, db: Session, project_id: int) -> Project | None:
        return self.repo.get(db, project_id)

    def create_project(self, db: Session, user_id: int, payload: ProjectCreate) -> Project:
        project = Project(
            user_id=user_id,
            goal_id=payload.goal_id,
            title=payload.title,
            description=payload.description,
            due_date=payload.due_date,
        )
        return self.repo.create(db, project)

    def update_project(self, db: Session, project: Project, payload: ProjectUpdate) -> Project:
        if payload.title is not None:
            project.title = payload.title
        if payload.description is not None:
            project.description = payload.description
        if payload.status is not None:
            project.status = payload.status
        if payload.due_date is not None:
            project.due_date = payload.due_date
        db.commit()
        db.refresh(project)
        return project

    def delete_project(self, db: Session, project: Project) -> None:
        self.repo.delete(db, project)

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, Field


class ProjectCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=5000)
    goal_id: int | None = Field(default=None)
    due_date: datetime | None = Field(default=None)


class ProjectUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=5000)
    status: str | None = Field(default=None, pattern="^(active|completed|paused)$")
    due_date: datetime | None = Field(default=None)


class ProjectRead(ProjectCreate):
    id: int
    user_id: int
    status: str

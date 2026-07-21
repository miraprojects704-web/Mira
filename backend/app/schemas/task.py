from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    details: str | None = Field(default=None, max_length=5000)
    project_id: int | None = Field(default=None)
    goal_id: int | None = Field(default=None)
    priority: str = Field(default="normal", pattern="^(low|normal|high|urgent)$")
    due_date: datetime | None = Field(default=None)


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    details: str | None = Field(default=None, max_length=5000)
    status: str | None = Field(default=None, pattern="^(todo|in_progress|done|blocked)$")
    priority: str | None = Field(default=None, pattern="^(low|normal|high|urgent)$")
    due_date: datetime | None = Field(default=None)
    is_complete: bool | None = Field(default=None)


class TaskRead(TaskCreate):
    id: int
    user_id: int
    status: str
    is_complete: bool

from __future__ import annotations

from pydantic import BaseModel, Field


class JourneyCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=5000)


class JourneyUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=5000)
    status: str | None = Field(default=None, pattern="^(active|completed|paused)$")


class JourneyRead(JourneyCreate):
    id: int
    user_id: int
    status: str

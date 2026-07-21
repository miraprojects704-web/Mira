from __future__ import annotations

from pydantic import BaseModel, Field


class VisionCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    statement: str | None = Field(default=None, max_length=2000)
    horizon: str | None = Field(default=None, max_length=64)


class VisionRead(VisionCreate):
    id: int
    user_id: int

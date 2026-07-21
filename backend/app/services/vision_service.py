from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.vision import Vision
from ..repositories.vision_repository import VisionRepository
from ..schemas.vision import VisionCreate


class VisionService:
    def __init__(self, repo: VisionRepository | None = None) -> None:
        self.repo = repo or VisionRepository()

    def get_user_vision(self, db: Session, user_id: int) -> Vision | None:
        visions = self.repo.get_by_user(db, user_id)
        return visions[0] if visions else None

    def create_vision(self, db: Session, user_id: int, payload: VisionCreate) -> Vision:
        vision = Vision(
            user_id=user_id,
            title=payload.title,
            statement=payload.statement,
            horizon=payload.horizon,
        )
        return self.repo.create(db, vision)

    def update_vision(self, db: Session, vision: Vision, **kwargs: object) -> Vision:
        for key, value in kwargs.items():
            if value is not None and hasattr(vision, key):
                setattr(vision, key, value)
        db.commit()
        db.refresh(vision)
        return vision

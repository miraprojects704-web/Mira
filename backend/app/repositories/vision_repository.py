from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.vision import Vision
from .base import RepositoryBase


class VisionRepository(RepositoryBase[Vision]):
    def __init__(self) -> None:
        super().__init__(Vision)

    def get_by_user(self, db: Session, user_id: int) -> list[Vision]:
        return db.query(Vision).filter(Vision.user_id == user_id).all()

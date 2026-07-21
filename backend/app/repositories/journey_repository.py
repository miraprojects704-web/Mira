from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.journey import Journey
from .base import RepositoryBase


class JourneyRepository(RepositoryBase[Journey]):
    def __init__(self) -> None:
        super().__init__(Journey)

    def get_by_user(self, db: Session, user_id: int) -> list[Journey]:
        return db.query(Journey).filter(Journey.user_id == user_id).all()

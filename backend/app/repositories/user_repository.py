from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.user import User
from .base import RepositoryBase


class UserRepository(RepositoryBase[User]):
    def __init__(self) -> None:
        super().__init__(User)

    def get_by_email(self, db: Session, email: str) -> User | None:
        return db.query(User).filter(User.email == email.lower()).one_or_none()

    def get_by_username(self, db: Session, username: str) -> User | None:
        return db.query(User).filter(User.username == username).one_or_none()

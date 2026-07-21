"""Application service for users."""

from sqlalchemy.orm import Session

from ..core.security import get_password_hash
from ..models.user import User
from .repository import create_user as create_user_repo
from .repository import get_user_by_email


class UserService:
    def register(self, db: Session, *, username: str, email: str, password: str) -> User:
        if get_user_by_email(db, email):
            raise ValueError("Email already registered")
        return create_user_repo(db, username=username, email=email, hashed_password=get_password_hash(password))

from __future__ import annotations

from sqlalchemy.orm import Session

from ..core.config import get_settings
from ..core.security import create_access_token, get_password_hash, verify_password
from ..models.user import User
from ..repositories.user_repository import UserRepository
from ..schemas.auth import LoginRequest, RegisterRequest


class AuthService:
    def __init__(self, user_repository: UserRepository | None = None) -> None:
        self.user_repository = user_repository or UserRepository()
        self.settings = get_settings()

    def register(self, db: Session, payload: RegisterRequest) -> User:
        email = payload.email.lower().strip()
        username = payload.username.strip()
        if self.user_repository.get_by_email(db, email):
            raise ValueError("Email already registered")
        if self.user_repository.get_by_username(db, username):
            raise ValueError("Username already taken")

        user = User(
            email=email,
            username=username,
            full_name=payload.full_name.strip() if payload.full_name else None,
            hashed_password=get_password_hash(payload.password),
            role="member",
        )
        return self.user_repository.create(db, user)

    def authenticate(self, db: Session, payload: LoginRequest) -> User | None:
        user = self.user_repository.get_by_email(db, payload.email.strip().lower())
        if not user or not verify_password(payload.password, user.hashed_password):
            return None
        if not user.is_active:
            return None
        return user

    def create_token_for_user(self, user: User) -> str:
        return create_access_token(
            subject=str(user.id),
            secret_key=self.settings.secret_key,
            expires_minutes=self.settings.access_token_expire_minutes,
        )

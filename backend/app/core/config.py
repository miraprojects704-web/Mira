from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
import os
from pathlib import Path


@dataclass(frozen=True, slots=True)
class Settings:
    app_name: str
    app_version: str
    environment: str
    secret_key: str
    database_url: str
    frontend_url: str
    cors_origins: tuple[str, ...]
    access_token_expire_minutes: int

    @property
    def is_production(self) -> bool:
        return self.environment.lower() in {"production", "staging"}


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    environment = os.getenv("ENVIRONMENT", "development").strip() or "development"
    database_url = os.getenv("DATABASE_URL") if environment.lower() in {"production", "staging"} else None
    if not database_url:
        database_path = Path(__file__).resolve().parents[3] / "mira.db"
        database_url = f"sqlite:///{database_path.as_posix()}"

    cors_origins = tuple(
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", os.getenv("FRONTEND_URL", "http://localhost:5173")).split(",")
        if origin.strip()
    )

    return Settings(
        app_name=os.getenv("APP_NAME", "Mira"),
        app_version=os.getenv("APP_VERSION", "0.1.0"),
        environment=environment,
        secret_key=os.getenv("SECRET_KEY", "change-me-in-production"),
        database_url=database_url,
        frontend_url=os.getenv("FRONTEND_URL", "http://localhost:5173"),
        cors_origins=cors_origins,
        access_token_expire_minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60")),
    )

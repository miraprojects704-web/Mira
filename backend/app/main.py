from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import get_settings
from .core.database import init_database
from .core.logging import configure_logging
from . import models  # noqa: F401
from .routers.auth import router as auth_router
from .routers.goal import router as goal_router
from .routers.health import router as health_router
from .routers.journey import router as journey_router
from .routers.project import router as project_router
from .routers.task import router as task_router
from .routers.vision import router as vision_router
from .dashboard.router import router as dashboard_router
from .users.router import router as users_router

settings = get_settings()


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_database()
    yield


def create_app() -> FastAPI:
    configure_logging()
    app = FastAPI(title=settings.app_name, version=settings.app_version, lifespan=lifespan)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=list(settings.cors_origins),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/")
    def root() -> dict[str, str]:
        return {"message": "Welcome to Mira", "version": settings.app_version}

    app.include_router(health_router)
    app.include_router(auth_router)
    app.include_router(dashboard_router)
    app.include_router(users_router)
    app.include_router(vision_router)
    app.include_router(journey_router)
    app.include_router(goal_router)
    app.include_router(project_router)
    app.include_router(task_router)
    return app


app = create_app()

"""Initialize the database schema for Mira."""

from .database import Base, engine


def init_db() -> None:
    Base.metadata.create_all(bind=engine)

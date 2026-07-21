from __future__ import annotations

from collections.abc import Iterable
from typing import Generic, TypeVar

from sqlalchemy.orm import Session

ModelT = TypeVar("ModelT")


class RepositoryBase(Generic[ModelT]):
    def __init__(self, model: type[ModelT]) -> None:
        self.model = model

    def get(self, db: Session, object_id: int) -> ModelT | None:
        return db.get(self.model, object_id)

    def list(self, db: Session) -> list[ModelT]:
        return list(db.query(self.model).all())

    def create(self, db: Session, instance: ModelT) -> ModelT:
        db.add(instance)
        db.commit()
        db.refresh(instance)
        return instance

    def delete(self, db: Session, instance: ModelT) -> None:
        db.delete(instance)
        db.commit()

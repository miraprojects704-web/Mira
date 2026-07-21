from __future__ import annotations

from sqlalchemy.orm import Session

from ..models.journey import Journey
from ..repositories.journey_repository import JourneyRepository
from ..schemas.journey import JourneyCreate, JourneyUpdate


class JourneyService:
    def __init__(self, repo: JourneyRepository | None = None) -> None:
        self.repo = repo or JourneyRepository()

    def list_user_journeys(self, db: Session, user_id: int) -> list[Journey]:
        return self.repo.get_by_user(db, user_id)

    def get_journey(self, db: Session, journey_id: int) -> Journey | None:
        return self.repo.get(db, journey_id)

    def create_journey(self, db: Session, user_id: int, payload: JourneyCreate) -> Journey:
        journey = Journey(
            user_id=user_id,
            title=payload.title,
            description=payload.description,
        )
        return self.repo.create(db, journey)

    def update_journey(self, db: Session, journey: Journey, payload: JourneyUpdate) -> Journey:
        if payload.title is not None:
            journey.title = payload.title
        if payload.description is not None:
            journey.description = payload.description
        if payload.status is not None:
            journey.status = payload.status
        db.commit()
        db.refresh(journey)
        return journey

    def delete_journey(self, db: Session, journey: Journey) -> None:
        self.repo.delete(db, journey)

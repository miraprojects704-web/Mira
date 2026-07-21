from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..core.dependencies import get_current_user
from ..models.user import User
from ..models.journey import Journey
from ..schemas.journey import JourneyCreate, JourneyRead, JourneyUpdate
from ..services.journey_service import JourneyService

router = APIRouter(prefix="/journeys", tags=["journeys"])
journey_service = JourneyService()


@router.get("", response_model=list[JourneyRead])
def list_my_journeys(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[Journey]:
    return journey_service.list_user_journeys(db, current_user.id)


@router.post("", response_model=JourneyRead, status_code=status.HTTP_201_CREATED)
def create_journey(
    payload: JourneyCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Journey:
    return journey_service.create_journey(db, current_user.id, payload)


@router.get("/{journey_id}", response_model=JourneyRead)
def get_journey(
    journey_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Journey:
    journey = journey_service.get_journey(db, journey_id)
    if not journey or journey.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journey not found")
    return journey


@router.put("/{journey_id}", response_model=JourneyRead)
def update_journey(
    journey_id: int,
    payload: JourneyUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Journey:
    journey = journey_service.get_journey(db, journey_id)
    if not journey or journey.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journey not found")
    return journey_service.update_journey(db, journey, payload)


@router.delete("/{journey_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_journey(
    journey_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    journey = journey_service.get_journey(db, journey_id)
    if not journey or journey.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Journey not found")
    journey_service.delete_journey(db, journey)

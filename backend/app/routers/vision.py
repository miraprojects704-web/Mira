from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..core.dependencies import get_current_user
from ..models.user import User
from ..models.vision import Vision
from ..schemas.vision import VisionCreate, VisionRead
from ..services.vision_service import VisionService

router = APIRouter(prefix="/visions", tags=["visions"])
vision_service = VisionService()


@router.get("", response_model=VisionRead | None)
def get_my_vision(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Vision | None:
    return vision_service.get_user_vision(db, current_user.id)


@router.post("", response_model=VisionRead, status_code=status.HTTP_201_CREATED)
def create_my_vision(
    payload: VisionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Vision:
    existing = vision_service.get_user_vision(db, current_user.id)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Vision already exists")
    return vision_service.create_vision(db, current_user.id, payload)


@router.put("", response_model=VisionRead)
def update_my_vision(
    payload: VisionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Vision:
    vision = vision_service.get_user_vision(db, current_user.id)
    if not vision:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vision not found")
    return vision_service.update_vision(db, vision, title=payload.title, statement=payload.statement, horizon=payload.horizon)

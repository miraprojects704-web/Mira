"""User routes."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..core.database import get_db
from ..core.dependencies import get_current_user
from .repository import get_user_by_id, list_users
from .schemas import UserResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
def get_me(current_user=Depends(get_current_user)):
    return current_user


@router.get("/", response_model=list[UserResponse])
def get_users(_current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    return list_users(db)


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, _current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

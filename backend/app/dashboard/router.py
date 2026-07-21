"""Dashboard endpoints for the compass experience."""

from fastapi import APIRouter, Depends

from ..core.dependencies import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/compass")
def compass(current_user=Depends(get_current_user)):
    return {
        "greeting": "Welcome back",
        "current_journey": "Create a calm, focused day",
        "daily_intention": "Stay grounded and intentional",
        "recommended_first_step": "Open your next priority",
        "mood": "steady",
        "energy": "balanced",
        "priorities": [],
        "calendar_snapshot": [],
        "insight": "You are building structure without pressure.",
    }

from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Header, HTTPException, status
from pydantic import BaseModel

from app.core.config import settings
from app.models.itinerary import TravelPreferences, TravelItineraryResponse
from app.services.gemini_service import gemini_service

router = APIRouter(prefix="/api/itinerary", tags=["Travel Itinerary"])


class ItineraryAPIResponse(BaseModel):
    status: str
    is_mock: bool
    notice: Optional[str] = None
    data: TravelItineraryResponse


class StatusResponse(BaseModel):
    api_key_configured: bool
    active_model: str
    app_version: str


@router.get("/status", response_model=StatusResponse)
async def check_api_status():
    """
    Checks if a Gemini API key is configured on the backend server.
    """
    has_key = bool(
        settings.GEMINI_API_KEY and
        settings.GEMINI_API_KEY.strip() not in ("", "your_gemini_api_key_here", "YOUR_GEMINI_API_KEY")
    )
    return StatusResponse(
        api_key_configured=has_key,
        active_model=settings.GEMINI_MODEL,
        app_version=settings.APP_VERSION,
    )


@router.get("/sample-preferences", response_model=List[Dict[str, Any]])
async def get_sample_preferences():
    """
    Returns curated sample travel profiles that frontend users can click to pre-fill the form.
    """
    return [
        {
            "label": "Kyoto Zen & Heritage",
            "destination": "Kyoto, Japan",
            "duration_days": 4,
            "start_date": "2026-11-10",
            "travel_party": "Couple",
            "budget": "Moderate",
            "pace": "Balanced",
            "interests": ["Culture & History", "Local Food", "Nature & Parks", "Photography"],
            "dietary_preferences": "Vegetarian friendly, matcha sweets lover",
            "accessibility_needs": "Comfortable with extensive walking",
            "custom_notes": "Want to experience an authentic tea ceremony and early morning bamboo groves."
        },
        {
            "label": "Paris Arts & Gastronomy",
            "destination": "Paris, France",
            "duration_days": 3,
            "start_date": "2026-10-15",
            "travel_party": "Solo",
            "budget": "Luxury",
            "pace": "Relaxed",
            "interests": ["Art & Museums", "Local Food", "Shopping & Boutiques", "Architecture"],
            "dietary_preferences": "No restrictions, loves artisan boulangeries and natural wine",
            "accessibility_needs": "Prefer metro-accessible venues",
            "custom_notes": "Focus on Left Bank literary cafes, Orsay museum, and sunset on the Seine."
        },
        {
            "label": "Banff Alpine Adventure",
            "destination": "Banff National Park, Canada",
            "duration_days": 5,
            "start_date": "2026-07-20",
            "travel_party": "Friends",
            "budget": "Moderate",
            "pace": "Fast-paced",
            "interests": ["Nature & Parks", "Outdoor Adventure", "Photography", "Wildlife"],
            "dietary_preferences": "Hearty comfort food & trail snacks",
            "accessibility_needs": "Good physical stamina for moderate alpine hikes",
            "custom_notes": "Sunrise at Moraine Lake and canoeing on Lake Louise are non-negotiable!"
        },
        {
            "label": "Amalfi Coast Romance",
            "destination": "Amalfi Coast, Italy",
            "duration_days": 4,
            "start_date": "2026-09-05",
            "travel_party": "Couple",
            "budget": "Luxury",
            "pace": "Relaxed",
            "interests": ["Beaches & Coastal", "Local Food", "Relaxation & Wellness", "Scenic Drives"],
            "dietary_preferences": "Fresh seafood, handmade pasta, limoncello",
            "accessibility_needs": "Prefer ferry transport over excessive cliff stairways",
            "custom_notes": "Include a private sunset boat trip around Positano and Capri."
        }
    ]


@router.post("/generate", response_model=ItineraryAPIResponse, status_code=status.HTTP_200_OK)
async def generate_itinerary(
    preferences: TravelPreferences,
    x_gemini_api_key: Optional[str] = Header(None, description="Optional per-request Gemini API key")
):
    """
    Generate a personalized, structured travel itinerary using Gemini API.
    If no key is configured or provided, returns a high-fidelity mock itinerary.
    """
    try:
        itinerary, is_mock, notice = await gemini_service.generate_itinerary(
            prefs=preferences,
            api_key_override=x_gemini_api_key
        )
        return ItineraryAPIResponse(
            status="success",
            is_mock=is_mock,
            notice=notice,
            data=itinerary
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate itinerary: {str(exc)}"
        )

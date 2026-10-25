from typing import List, Optional, Dict
from pydantic import BaseModel, Field

class TravelPreferences(BaseModel):
    destination: str = Field(..., description="Target destination city, region or country", example="Kyoto, Japan")
    duration_days: int = Field(3, ge=1, le=14, description="Length of trip in days (1 to 14)", example=3)
    start_date: Optional[str] = Field(None, description="Start date of the trip in YYYY-MM-DD format", example="2026-11-01")
    travel_party: str = Field("Solo", description="Who is traveling: Solo, Couple, Family, Friends, or Business", example="Couple")
    budget: str = Field("Moderate", description="Budget category: Budget, Moderate, or Luxury", example="Moderate")
    pace: str = Field("Balanced", description="Itinerary pace: Relaxed, Balanced, or Fast-paced", example="Balanced")
    interests: List[str] = Field(
        default_factory=lambda: ["Culture & History", "Local Food"],
        description="List of traveler interests and vibes",
        example=["Culture & History", "Local Food", "Nature & Parks"]
    )
    dietary_preferences: Optional[str] = Field(None, description="Dietary requirements or food preferences", example="Vegetarian options, specialty coffee")
    accessibility_needs: Optional[str] = Field(None, description="Physical accessibility or mobility requirements", example="Step-free access, gentle walking")
    custom_notes: Optional[str] = Field(None, description="Any specific spots, bucket list items, or preferences", example="Prefer early mornings and hidden spots away from crowds")


class Activity(BaseModel):
    time_of_day: str = Field(..., description="'Morning', 'Afternoon', or 'Evening'", example="Morning")
    time_slot: str = Field(..., description="Suggested time range", example="08:30 AM - 11:00 AM")
    title: str = Field(..., description="Catchy title of the activity", example="Walk through Fushimi Inari Torii Gates")
    description: str = Field(..., description="Vivid, helpful description of the activity and why it fits preferences")
    location: str = Field(..., description="Specific landmark, district or address", example="Fushimi Ward, Kyoto")
    category: str = Field("Sightseeing", description="Category like Culture, Food, Nature, Adventure, Relaxation, Shopping", example="Culture")
    estimated_duration: str = Field(..., description="Estimated time needed", example="2.5 hours")
    estimated_cost: str = Field(..., description="Approximate expense per person", example="Free entry")
    insider_tip: Optional[str] = Field(None, description="Local pro-tip or recommendation to make the visit special")


class DayItinerary(BaseModel):
    day_number: int = Field(..., description="1-indexed day number", example=1)
    title: str = Field(..., description="Catchy title for the day", example="Historic Shrines & Bamboo Serenity")
    theme: str = Field(..., description="Focus or theme of the day", example="Ancient Kyoto & Zen Atmosphere")
    date: Optional[str] = Field(None, description="Specific date if start_date was provided", example="Day 1")
    daily_summary: str = Field(..., description="One-sentence inspiring summary of the day's flow")
    activities: List[Activity] = Field(..., description="Sequential list of morning, afternoon, and evening activities")
    meals_recommendation: Dict[str, str] = Field(
        default_factory=dict,
        description="Recommended breakfast, lunch, and dinner suggestions with dish names",
        example={
            "breakfast": "Traditional matcha pastry at a local kissaten near the station",
            "lunch": "Handmade soba noodles in historic Arashiyama",
            "dinner": "Seasonal Kaiseki tasting menu in Gion alleyways"
        }
    )
    estimated_daily_budget: str = Field(..., description="Estimated budget range for this day", example="$60 - $90 per person")


class TripSummary(BaseModel):
    destination: str = Field(..., description="Confirmed destination")
    total_days: int = Field(..., description="Number of days planned")
    travel_party: str = Field(..., description="Confirmed travel party")
    budget_tier: str = Field(..., description="Budget tier selected")
    vibe_overview: str = Field(..., description="A compelling 2-3 sentence overview capturing the curated journey")
    estimated_total_cost: str = Field(..., description="Overall estimated cost per person for activities, food, local transit", example="$250 - $400 USD")
    best_time_to_visit: str = Field(..., description="Ideal season or months for this trip style")
    local_transportation_advice: str = Field(..., description="Best way to get around (Metro pass, rental bike, walking, rideshare)")


class PackingItem(BaseModel):
    category: str = Field(..., description="Category: e.g. Clothing, Essentials, Gear, Weather-specific", example="Essentials")
    items: List[str] = Field(..., description="List of items to pack", example=["Comfortable walking shoes", "Universal power adapter", "Refillable water bottle"])


class TravelItineraryResponse(BaseModel):
    trip_summary: TripSummary
    days: List[DayItinerary]
    packing_checklist: List[PackingItem]
    general_travel_tips: List[str] = Field(
        default_factory=list,
        description="Top practical tips (tipping customs, currency, cultural etiquette, apps to download)"
    )

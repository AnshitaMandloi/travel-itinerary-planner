import json
import logging
from typing import Optional
from google import genai
from google.genai import types
from google.genai.errors import APIError

from app.core.config import settings
from app.models.itinerary import TravelPreferences, TravelItineraryResponse
from app.services.mock_data import generate_mock_itinerary

logger = logging.getLogger(__name__)

class GeminiItineraryService:
    def __init__(self):
        self.default_model = settings.GEMINI_MODEL or "gemini-2.5-flash"

    def _get_client(self, api_key_override: Optional[str] = None) -> Optional[genai.Client]:
        """
        Creates and returns a Gemini client instance.
        Uses api_key_override if provided, otherwise falls back to settings.GEMINI_API_KEY.
        """
        key = api_key_override or settings.GEMINI_API_KEY
        if not key or key.strip() in ("", "your_gemini_api_key_here", "YOUR_GEMINI_API_KEY"):
            return None
        return genai.Client(api_key=key.strip())

    def _build_prompt(self, prefs: TravelPreferences) -> str:
        """
        Constructs a structured prompt tailored to the traveler's specific parameters.
        """
        interests_str = ", ".join(prefs.interests) if prefs.interests else "general sightseeing, local cuisine, culture"
        dietary_str = prefs.dietary_preferences or "No specific dietary restrictions"
        accessibility_str = prefs.accessibility_needs or "Standard mobility, walking is comfortable"
        notes_str = prefs.custom_notes or "No special requests"
        date_str = f"starting on {prefs.start_date}" if prefs.start_date else ""

        prompt = f"""You are an elite, world-class personal travel concierge and local trip planner.
Plan a highly personalized, structured {prefs.duration_days}-day travel itinerary for {prefs.destination} {date_str}.

TRAVELER PROFILE & PREFERENCES:
- Destination: {prefs.destination}
- Duration: {prefs.duration_days} days
- Travel Party / Companions: {prefs.travel_party}
- Budget Tier: {prefs.budget}
- Itinerary Pace: {prefs.pace} (e.g. relaxed with plenty of downtime, or balanced, or fast-paced seeing maximum attractions)
- Key Interests / Themes: {interests_str}
- Dietary Preferences / Restrictions: {dietary_str}
- Accessibility / Mobility: {accessibility_str}
- Specific Notes / Requests: {notes_str}

REQUIREMENTS:
1. Ensure the itinerary is geographically realistic: group activities by neighborhoods/districts to minimize transit fatigue.
2. For every day (from Day 1 to Day {prefs.duration_days}), provide:
   - Day title and theme reflecting the traveler's stated interests.
   - Morning, Afternoon, and Evening activities with realistic time slots, specific landmark/venue names, detailed descriptions, estimated durations, cost indications, and insider local tips.
   - Meal recommendations (breakfast, lunch, dinner) tailored to {dietary_str} and budget tier {prefs.budget}.
   - Daily estimated budget.
3. Provide a compelling Trip Summary including total estimated cost, best season/time to visit, and local transit advice.
4. Provide a practical packing checklist categorized into Clothing, Electronics/Gear, and Health/Comfort.
5. Provide top practical travel tips specific to {prefs.destination} (tipping etiquette, transit passes, cultural norms).

Return the response adhering strictly to the requested JSON schema.
"""
        return prompt

    async def generate_itinerary(
        self,
        prefs: TravelPreferences,
        api_key_override: Optional[str] = None
    ) -> tuple[TravelItineraryResponse, bool, Optional[str]]:
        """
        Generates a travel itinerary using Gemini API or fallback mock.
        Returns:
            (itinerary_response, is_mock, message)
        """
        client = self._get_client(api_key_override)

        if not client:
            logger.info("No valid Gemini API key found. Serving high-fidelity mock itinerary.")
            mock_res = generate_mock_itinerary(prefs)
            notice = (
                "Notice: Running in demo preview mode with sample curated data. "
                "To enable live Gemini AI generation, set GEMINI_API_KEY in backend/.env "
                "or pass your key via the API."
            )
            return mock_res, True, notice

        prompt = self._build_prompt(prefs)

        try:
            # Generate structured JSON matching our Pydantic schema
            response = client.models.generate_content(
                model=self.default_model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=TravelItineraryResponse,
                    temperature=0.7,
                ),
            )

            if not response.text:
                raise ValueError("Empty response received from Gemini API.")

            # Validate the JSON against the Pydantic model
            parsed_data = TravelItineraryResponse.model_validate_json(response.text)
            return parsed_data, False, None

        except APIError as api_err:
            logger.error(f"Gemini API error occurred: {api_err}", exc_info=True)
            # If rate limited or quota issue, gracefully fallback with an explanatory notice
            mock_res = generate_mock_itinerary(prefs)
            notice = f"Gemini API returned: {api_err.message}. Showing sample itinerary as fallback."
            return mock_res, True, notice

        except Exception as e:
            logger.error(f"Unexpected error during itinerary generation: {e}", exc_info=True)
            mock_res = generate_mock_itinerary(prefs)
            notice = f"An error occurred ({str(e)}). Showing sample itinerary as fallback."
            return mock_res, True, notice

gemini_service = GeminiItineraryService()

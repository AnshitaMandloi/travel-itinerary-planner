# Personalized Travel Itinerary Planner - FastAPI Backend

FastAPI backend powered by Google Gemini AI (`gemini-2.5-flash`) providing structured JSON itinerary generation.

## Features
- **Structured JSON Schema**: Guaranteed schema compliance with Pydantic models.
- **Gemini 2.5 Flash Integration**: Built with the official `google-genai` SDK.
- **Dynamic Fallback/Mock Mode**: Works out of the box even before adding your Gemini API key so you can develop and test immediately.
- **FastAPI OpenAPI Documentation**: Interactive Swagger docs available at `/docs` and ReDoc at `/redoc`.
- **CORS Configured**: Pre-configured for Vite React frontend running on `http://localhost:5173`.

---

## Setup & Running

### 1. Create Virtual Environment & Install Dependencies
```bash
python -m venv venv
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Edit `.env` and set your Gemini API key:
```ini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```
*(Get a free API key at [Google AI Studio](https://aistudio.google.com/))*

### 3. Start the Server
```bash
uvicorn app.main:app --reload --port 8000
```
Server runs at `http://localhost:8000`
Swagger Docs: `http://localhost:8000/docs`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status and root greeting |
| `GET` | `/health` | Health check and Gemini configuration status |
| `GET` | `/api/itinerary/status` | Check if Gemini API key is configured |
| `GET` | `/api/itinerary/sample-preferences` | Curated sample travel preferences |
| `POST` | `/api/itinerary/generate` | Generate day-by-day JSON itinerary |

### Sample POST Request Body (`/api/itinerary/generate`)
```json
{
  "destination": "Kyoto, Japan",
  "duration_days": 3,
  "start_date": "2026-11-01",
  "travel_party": "Couple",
  "budget": "Moderate",
  "pace": "Balanced",
  "interests": ["Culture & History", "Local Food", "Nature & Parks"],
  "dietary_preferences": "Vegetarian options, specialty coffee",
  "accessibility_needs": "Comfortable with walking",
  "custom_notes": "Early morning visits to beat the crowds"
}
```

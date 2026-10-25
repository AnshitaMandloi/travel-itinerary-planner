# WanderPlan AI - Personalized Travel Itinerary Planner 🌍✈️

A full-stack, production-ready boilerplate for generating personalized, structured day-by-day travel itineraries using **FastAPI**, **Google Gemini 2.5 Flash**, and **React (Vite + Tailwind CSS v4)**.

---

## 🎯 Architecture & Features

### Backend (`FastAPI`)
- **Structured JSON Schema**: Guaranteed output structure enforced via Pydantic (`TravelItineraryResponse`).
- **Official Google GenAI SDK**: Uses `google-genai` with `gemini-2.5-flash` model and strict JSON schema generation.
- **Zero-Friction Fallback (Mock Mode)**: Works out of the box even before adding your Gemini API key, returning rich simulated itineraries so frontend development and testing never stall.
- **Interactive Documentation**: Swagger UI docs at `/docs` and ReDoc at `/redoc`.
- **CORS Configured**: Pre-configured to work seamlessly with the Vite dev server.

### Frontend (`React + Vite + Tailwind CSS v4`)
- **Travel Preferences Form**:
  - Destination input with quick-pick suggestion chips (Kyoto, Paris, Banff, Amalfi, Tokyo, etc.).
  - Trip duration slider (1 to 14 days) and optional start date picker.
  - Travel party selector (Solo, Couple, Family, Friends).
  - Budget tier selector (Budget $, Moderate $$, Luxury $$$).
  - Pace selector (Relaxed, Balanced, Fast-paced).
  - Multi-select interest badges (Culture & History, Food & Markets, Nature, Photography, Art, Adventure, Shopping, Nightlife, Wellness, Hidden Gems).
  - Optional dietary restrictions, accessibility requirements, and custom bucket list notes.
  - One-click preset loader (Kyoto Zen, Paris Arts, Banff Alpine, Amalfi Romance).
- **Day-by-Day Timeline View**:
  - Hero Trip Summary card with budget estimate, best season to visit, and transit tips.
  - Day selector tabs (navigate single days or view full journey).
  - Morning, Afternoon, and Evening activities with time ranges, landmark locations, costs, and local insider tips.
  - Curated daily breakfast, lunch, and dinner recommendations.
- **Interactive Packing Checklist**: Check off items by category with a live progress bar.
- **Export & Sharing**: One-click "Export JSON", "Copy Summary", and "Print / PDF View".
- **Built-in API Key Modal**: Easily test with your own API key directly in the browser or via backend `.env`.

---

## 📁 Project Structure

```
travel-itinerary-planner/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   └── config.py              # Pydantic BaseSettings & CORS
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── itinerary.py           # Pydantic models for request & structured JSON response
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── gemini_service.py      # Google GenAI SDK client & prompt builder
│   │   │   └── mock_data.py           # High-fidelity mock generator for demo/fallback
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   └── itinerary.py           # POST /generate, GET /status, GET /sample-preferences
│   │   ├── __init__.py
│   │   └── main.py                    # FastAPI app entrypoint
│   ├── requirements.txt               # Backend dependencies
│   ├── .env.example                   # Environment variable template
│   ├── .env                           # Local environment config
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx             # Top bar with Gemini connection badge
│   │   │   ├── ApiKeyModal.jsx        # API key settings & instructions modal
│   │   │   ├── PreferencesForm.jsx    # Travel input form with quick-picks & presets
│   │   │   ├── ItineraryView.jsx      # Day filter tabs and container
│   │   │   ├── TripSummaryCard.jsx    # Hero card with stats, transit advice, export actions
│   │   │   ├── DayCard.jsx            # Single day container with meals and schedule
│   │   │   ├── ActivityItem.jsx       # Individual activity node (time, location, tip)
│   │   │   ├── PackingList.jsx        # Interactive packing checklist with progress bar
│   │   │   ├── TravelTips.jsx         # Practical local destination tips
│   │   │   └── LoadingState.jsx       # Animated travel steps indicator
│   │   ├── services/
│   │   │   └── api.js                 # Frontend API client
│   │   ├── App.jsx                    # Root application component
│   │   ├── main.jsx                   # React DOM entry
│   │   └── index.css                  # Tailwind CSS v4 styling
│   ├── package.json
│   ├── vite.config.js                 # Vite + Tailwind v4 + API proxy
│   ├── index.html
│   └── README.md
│
├── run.bat                            # Windows 1-click launcher
├── run.ps1                            # PowerShell launcher
├── .gitignore
└── README.md                          # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python**: 3.10+
- **Node.js**: 18+ (Node 24 tested)
- **Google Gemini API Key** (optional for demo, recommended for live AI generation): [Get a free key here](https://aistudio.google.com/app/apikey)

---

### One-Click Launch (Windows)
Double-click `run.bat` or execute in PowerShell:
```powershell
.\run.ps1
```

---

### Manual Launch

#### 1. Start the FastAPI Backend
```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure your Gemini API Key in .env
# Open .env and set:
# GEMINI_API_KEY=your_gemini_api_key_here

# Run the backend
uvicorn app.main:app --reload --port 8000
```
- API is running at: `http://localhost:8000`
- Interactive Swagger Docs: `http://localhost:8000/docs`

#### 2. Start the React Frontend
In a new terminal window:
```bash
cd frontend

# Install packages
npm install

# Start Vite dev server
npm run dev
```
- Open your browser at: `http://localhost:5173`

---

## 📡 API Reference

### `POST /api/itinerary/generate`
Generates a structured day-by-day JSON travel itinerary.

#### Request Headers (Optional)
- `x-gemini-api-key`: Per-request Gemini API key override.

#### Request Body
```json
{
  "destination": "Kyoto, Japan",
  "duration_days": 3,
  "start_date": "2026-11-01",
  "travel_party": "Couple",
  "budget": "Moderate",
  "pace": "Balanced",
  "interests": ["Culture & History", "Local Food", "Nature & Parks"],
  "dietary_preferences": "Vegetarian options, matcha lover",
  "accessibility_needs": "Standard mobility, walking is comfortable",
  "custom_notes": "Early morning visits to beat the crowds"
}
```

#### Response Structure (`200 OK`)
```json
{
  "status": "success",
  "is_mock": false,
  "notice": null,
  "data": {
    "trip_summary": {
      "destination": "Kyoto, Japan",
      "total_days": 3,
      "travel_party": "Couple",
      "budget_tier": "Moderate",
      "vibe_overview": "A 3-day cultural immersion through ancient temples and scenic bamboo groves...",
      "estimated_total_cost": "$280 - $420 USD",
      "best_time_to_visit": "October - November (Autumn foliage) or March - April (Cherry blossoms)",
      "local_transportation_advice": "Purchase an ICOCA transit card for local buses and subways."
    },
    "days": [
      {
        "day_number": 1,
        "title": "Day 1: Ancient Shrines & Bamboo Serenity",
        "theme": "Spiritual Heritage & Scenic Nature",
        "date": "Day 1",
        "daily_summary": "A peaceful day exploring Fushimi Inari and Arashiyama groves.",
        "activities": [
          {
            "time_of_day": "Morning",
            "time_slot": "08:30 AM - 11:00 AM",
            "title": "Walk through Fushimi Inari Torii Gates",
            "description": "Hike the iconic path of thousands of vermilion torii gates winding up sacred Mount Inari.",
            "location": "Fushimi Ward, Kyoto",
            "category": "Culture",
            "estimated_duration": "2.5 hours",
            "estimated_cost": "Free entry",
            "insider_tip": "Arrive before 8:30 AM to capture photos without crowds."
          }
        ],
        "meals_recommendation": {
          "breakfast": "Matcha pastries near Kyoto Station",
          "lunch": "Handmade soba noodles in Arashiyama",
          "dinner": "Seasonal Obanzai dinner in Gion alleyways"
        },
        "estimated_daily_budget": "$70 - $110 per person"
      }
    ],
    "packing_checklist": [
      {
        "category": "Clothing & Footwear",
        "items": ["Comfortable walking sneakers", "Light layers", "Compact umbrella"]
      }
    ],
    "general_travel_tips": [
      "Carry cash for small food stalls and temple entrance fees.",
      "Download Google Translate camera feature for reading menus."
    ]
  }
}
```

---

## 🧪 Testing

### Backend Health Check
```bash
curl http://localhost:8000/health
```

### Backend Itinerary Generation Test
```bash
curl -X POST http://localhost:8000/api/itinerary/generate \
  -H "Content-Type: application/json" \
  -d "{\"destination\":\"Paris, France\",\"duration_days\":2,\"travel_party\":\"Solo\",\"budget\":\"Moderate\",\"pace\":\"Balanced\"}"
```

---

## 🛠️ Tech Stack
- **Backend**: FastAPI, Pydantic v2, Google GenAI SDK (`google-genai`), Uvicorn
- **AI Model**: Google Gemini 2.5 Flash (`gemini-2.5-flash`)
- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers.itinerary import router as itinerary_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Personalized Travel Itinerary Planner API powered by Google Gemini AI",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS configuration to allow React frontend (Vite) to communicate smoothly
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(itinerary_router)

@app.get("/", tags=["Health"])
async def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "status": "healthy"
    }

@app.get("/health", tags=["Health"])
async def health_check():
    has_key = bool(
        settings.GEMINI_API_KEY and
        settings.GEMINI_API_KEY.strip() not in ("", "your_gemini_api_key_here", "YOUR_GEMINI_API_KEY")
    )
    return {
        "status": "healthy",
        "gemini_api_configured": has_key,
        "gemini_model": settings.GEMINI_MODEL,
        "environment": settings.ENVIRONMENT
    }

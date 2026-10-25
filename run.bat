@echo off
echo ========================================================
echo   Starting WanderPlan AI - Travel Itinerary Planner
echo ========================================================
echo.

:: Launch FastAPI backend in a new window
echo [1/2] Starting FastAPI Backend on http://localhost:8000...
start "WanderPlan Backend" cmd /k "cd /d %~dp0backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000"

:: Launch Vite React frontend in a new window
echo [2/2] Starting React Frontend on http://localhost:5173...
start "WanderPlan Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers have been launched!
echo - Frontend: http://localhost:5173
echo - Backend API Docs: http://localhost:8000/docs
echo ========================================================
pause

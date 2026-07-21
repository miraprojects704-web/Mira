@echo off
REM Windows batch setup script for Mira local development

setlocal enabledelayedexpansion

echo 🚀 Setting up Mira local development environment...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is required but not installed.
    exit /b 1
)

cd /d "%~dp0"

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo 📦 Creating Python virtual environment...
    python -m venv venv
    call venv\Scripts\activate.bat
    python -m pip install --upgrade pip setuptools wheel
) else (
    call venv\Scripts\activate.bat
)

REM Install dependencies
echo 📚 Installing dependencies...
pip install -r requirements.txt

REM Create database and run migrations
echo 🗄️  Initializing database...
alembic upgrade head

REM Seed database
echo 🌱 Seeding database with sample data...
python -m scripts.seed_data

REM Build frontend
echo 🏗️  Building frontend...
cd frontend
call npm install
call npm run build
cd ..

echo.
echo ✅ Setup complete! You can now run:
echo   - Backend: python -m uvicorn app.main:app --reload
echo   - Frontend: cd frontend ^&& npm run dev
echo   - Or use Docker Compose: docker compose up

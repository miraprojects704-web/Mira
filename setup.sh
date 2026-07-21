#!/bin/bash
set -e

echo "🚀 Setting up Mira local development environment..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

cd "$(dirname "$0")/.."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip setuptools wheel
else
    source venv/bin/activate
fi

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Create database and run migrations
echo "🗄️  Initializing database..."
alembic upgrade head

# Seed database
echo "🌱 Seeding database with sample data..."
python -m scripts.seed_data

# Build frontend
echo "🏗️  Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo ""
echo "✅ Setup complete! You can now run:"
echo "  - Backend: python -m uvicorn app.main:app --reload"
echo "  - Frontend: cd frontend && npm run dev"
echo "  - Or use Docker Compose: docker compose up"

# Mira

Mira is a new, independent productivity and reflection platform. It is built as a fresh codebase outside the Lore project with its own backend, frontend, database, migrations, deployment config, and test suite.

## Current shape

- `backend/`: FastAPI, SQLAlchemy, Alembic, JWT auth, repository/service layers
- `frontend/`: React, TypeScript, Vite, Tailwind, React Query, Axios
- `docker-compose.yml`: local full-stack orchestration
- `backend/railway.toml` and `frontend/railway.toml`: deployment entry points
- `backend/Dockerfile` and `frontend/Dockerfile`: container builds

The backend defaults to a local SQLite database during development so the project stays isolated from any unrelated environment variables. Production can still provide `DATABASE_URL` explicitly.

## Run the backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open `http://127.0.0.1:8000/docs`.

## Next steps

The initial scaffold is being expanded into the full Mira domain: journeys, visions, goals, projects, tasks, habits, journal, reflections, achievements, insights, budget, AI guidance, and notifications.

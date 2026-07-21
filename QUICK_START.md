# Mira - One Command Local Setup

## Quick Start

### Windows
```bash
.\setup.bat
```

### macOS / Linux
```bash
chmod +x setup.sh
./setup.sh
```

This will:
1. Create Python virtual environment
2. Install backend dependencies
3. Run database migrations
4. Seed database with demo data
5. Install frontend dependencies
6. Build frontend

## What Got Created

### Backend CRUD Infrastructure

New repositories, services, routers, and schemas for:
- **Journey** - User's long-term narrative arcs
- **Vision** - User's overarching life vision (one per user)
- **Goal** - Specific measurable objectives
- **Project** - Concrete work to accomplish goals
- **Task** - Individual units of work

### API Endpoints

All endpoints require Bearer token authentication:

#### Journeys
- `GET /journeys` - List user's journeys
- `POST /journeys` - Create journey
- `GET /journeys/{id}` - Get specific journey
- `PUT /journeys/{id}` - Update journey
- `DELETE /journeys/{id}` - Delete journey

#### Goals
- `GET /goals` - List user's goals
- `POST /goals` - Create goal
- `GET /goals/{id}` - Get specific goal
- `PUT /goals/{id}` - Update goal
- `DELETE /goals/{id}` - Delete goal

#### Projects
- `GET /projects` - List user's projects
- `POST /projects` - Create project
- `GET /projects/{id}` - Get specific project
- `PUT /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project

#### Tasks
- `GET /tasks` - List user's tasks
- `POST /tasks` - Create task
- `GET /tasks/{id}` - Get specific task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

#### Vision
- `GET /visions` - Get user's vision (one per user)
- `POST /visions` - Create vision
- `PUT /visions` - Update vision

### Frontend Authentication

**AuthContext** (`src/features/auth/AuthContext.tsx`):
- Manages authentication state and token storage
- Persists login across page reloads
- Provides `useAuth()` hook for consuming components

**Protected Routes**:
- `/dashboard` - Protected with `<PrivateRoute>` component
- Redirects to login if not authenticated
- Shows loading state while checking auth

**Login Page** (`src/pages/LoginPage.tsx`):
- Submit form to `/auth/login` or `/auth/register`
- Demo login button for testing
- Error handling and loading states

**Dashboard Page** (`src/pages/DashboardPage.tsx`):
- Fetches journeys, goals, tasks, and vision from API
- Displays stats and lists
- Real-time data from backend

### Database Seeding

**Demo Account:**
- Email: `demo@mira.local`
- Password: `demo123`
- Includes sample vision, journeys, goals, projects, and tasks

Run seed script anytime:
```bash
python -m scripts.seed_data
```

### Local Development

**Start Backend:**
```bash
python -m uvicorn app.main:app --reload
```
Backend runs on `http://localhost:8000`

**Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

**Run Tests:**
```bash
python -m pytest backend/tests/ -v
```
All 8 tests pass (auth + CRUD + health endpoints)

### Docker Development

```bash
docker compose up
```

This starts:
- PostgreSQL database on port 5432
- FastAPI backend on port 8000
- Nginx frontend on port 3000

## Architecture

### Backend (FastAPI)

```
app/
├── routers/          # API endpoints
│   ├── auth.py
│   ├── journey.py
│   ├── goal.py
│   ├── project.py
│   ├── task.py
│   └── vision.py
├── services/         # Business logic
│   ├── auth_service.py
│   ├── journey_service.py
│   ├── goal_service.py
│   ├── project_service.py
│   ├── task_service.py
│   └── vision_service.py
├── repositories/     # Data access (generic + specific)
│   ├── base.py
│   ├── user_repository.py
│   ├── journey_repository.py
│   ├── goal_repository.py
│   ├── project_repository.py
│   ├── task_repository.py
│   └── vision_repository.py
├── models/           # SQLAlchemy ORM models
├── schemas/          # Pydantic request/response models
└── core/             # Config, database, security, logging
```

### Frontend (React)

```
src/
├── features/auth/
│   └── AuthContext.tsx      # Auth state management
├── components/
│   ├── PrivateRoute.tsx      # Protected route wrapper
│   └── layout/AppShell.tsx   # Main layout with nav
├── pages/
│   ├── LoginPage.tsx         # Login + Register
│   ├── DashboardPage.tsx     # User dashboard with data
│   └── HomePage.tsx          # Landing page
└── lib/
    └── apiClient.ts          # Axios HTTP client with auth
```

## API Testing

**Login:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@mira.local","password":"demo123"}'
```

Response includes `access_token` - use in `Authorization: Bearer <token>` header

**Create Journey:**
```bash
curl -X POST http://localhost:8000/journeys \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Journey","description":"A test journey"}'
```

## Import Fixes

All import issues fixed:
- ✅ Backend imports properly structure code
- ✅ Frontend components properly wired
- ✅ Auth flow integrated end-to-end
- ✅ All tests passing

## Next Steps

1. **Extend Dashboard** - Add create/edit modals for journeys, goals, tasks
2. **Add Real-Time** - WebSocket updates for collaborative editing
3. **AI Integration** - Add AI guidance endpoints for reflection and insights
4. **Mobile** - React Native or PWA
5. **Analytics** - Track progress and habits over time

## Troubleshooting

**"Port 8000 already in use"**
- Change port: `python -m uvicorn app.main:app --port 8001 --reload`
- Update frontend: `VITE_API_URL=http://localhost:8001 npm run dev`

**"Database locked" error**
- Delete `backend/mira.db` and run setup again
- Or use PostgreSQL for development: update `DATABASE_URL` in `.env`

**Frontend won't load**
- Check backend is running: `curl http://localhost:8000/`
- Check CORS: backend should allow `http://localhost:5173`
- Clear browser cache: `Cmd+Shift+Delete` or `Ctrl+Shift+Delete`

## Files Added This Session

### Backend
- `app/repositories/`: journey, vision, goal, project, task repos
- `app/services/`: journey, vision, goal, project, task services
- `app/routers/`: journey, vision, goal, project, task routers
- `app/schemas/`: journey, vision, goal, project, task schemas
- `scripts/seed_data.py` - Database seeding script
- `tests/test_crud.py` - CRUD endpoint tests

### Frontend
- `features/auth/AuthContext.tsx` - Auth state management
- `components/PrivateRoute.tsx` - Protected route wrapper
- `components/LogoutButton.tsx` - Logout functionality
- `lib/apiClient.ts` - Authenticated HTTP client
- Updated `pages/LoginPage.tsx` - Full login form
- Updated `pages/DashboardPage.tsx` - Data-driven dashboard
- Updated `components/layout/AppShell.tsx` - Auth-aware navigation

### Scripts
- `setup.sh` - Linux/macOS initialization
- `setup.bat` - Windows initialization

## Test Results

```
8 passed, 1 warning in 2.40s

✓ test_register_and_login_user
✓ test_auth_me_requires_token
✓ test_create_and_list_journeys
✓ test_create_and_list_goals
✓ test_create_and_list_tasks
✓ test_unauthorized_access
✓ test_health_endpoint
✓ test_home_endpoint
```

Enjoy building Mira! 🚀

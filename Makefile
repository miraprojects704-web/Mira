.PHONY: install-backend install-frontend backend frontend dev test-backend test-frontend ci

install-backend:
	cd backend && python -m pip install -r requirements.txt

install-frontend:
	cd frontend && npm ci

backend:
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

frontend:
	cd frontend && npm run dev -- --host

dev:
	docker compose up --build

test-backend:
	cd backend && pytest

test-frontend:
	cd frontend && npm ci && npm run lint && npm run build

ci: install-backend test-backend install-frontend test-frontend

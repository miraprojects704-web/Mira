from fastapi.testclient import TestClient

from app.core.database import SessionLocal, init_database
from app.main import app
from app.models.user import User

client = TestClient(app)


def setup_module() -> None:
    init_database()
    db = SessionLocal()
    try:
        db.query(User).delete()
        db.commit()
    finally:
        db.close()


def test_register_and_login_user() -> None:
    register_response = client.post(
        "/auth/register",
        json={
            "email": "maya@example.com",
            "username": "maya",
            "password": "StrongPass123!",
            "full_name": "Maya Mira",
        },
    )
    assert register_response.status_code == 201
    register_body = register_response.json()
    assert register_body["user"]["email"] == "maya@example.com"
    assert register_body["access_token"] is not None
    assert register_body["token_type"] == "bearer"

    login_response = client.post(
        "/auth/login",
        json={"email": "maya@example.com", "password": "StrongPass123!"},
    )
    assert login_response.status_code == 200
    login_body = login_response.json()
    assert login_body["token_type"] == "bearer"
    assert login_body["user"]["username"] == "maya"


def test_auth_me_requires_token() -> None:
    response = client.get("/auth/me")
    assert response.status_code == 401

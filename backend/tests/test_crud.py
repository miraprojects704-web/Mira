from fastapi.testclient import TestClient
import uuid

from app.main import app

client = TestClient(app)


def test_create_and_list_journeys():
    """Test journey CRUD operations"""
    # Register user with unique email
    unique_id = str(uuid.uuid4())[:8]
    register_response = client.post(
        "/auth/register",
        json={
            "email": f"journey_test_{unique_id}@mira.local",
            "username": f"journeytest_{unique_id}",
            "password": "test1234",
            "full_name": "Journey Test",
        },
    )
    assert register_response.status_code == 201
    token = register_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Create journey
    create_response = client.post(
        "/journeys",
        headers=headers,
        json={"title": "Test Journey", "description": "A test journey"},
    )
    assert create_response.status_code == 201
    journey = create_response.json()
    assert journey["title"] == "Test Journey"
    assert journey["status"] == "active"
    journey_id = journey["id"]

    # List journeys
    list_response = client.get("/journeys", headers=headers)
    assert list_response.status_code == 200
    journeys = list_response.json()
    assert len(journeys) >= 1
    assert any(j["id"] == journey_id for j in journeys)

    # Get specific journey
    get_response = client.get(f"/journeys/{journey_id}", headers=headers)
    assert get_response.status_code == 200
    assert get_response.json()["id"] == journey_id

    # Update journey
    update_response = client.put(
        f"/journeys/{journey_id}",
        headers=headers,
        json={"title": "Updated Journey", "status": "completed"},
    )
    assert update_response.status_code == 200
    assert update_response.json()["title"] == "Updated Journey"
    assert update_response.json()["status"] == "completed"

    # Delete journey
    delete_response = client.delete(f"/journeys/{journey_id}", headers=headers)
    assert delete_response.status_code == 204

    # Verify deleted
    get_response = client.get(f"/journeys/{journey_id}", headers=headers)
    assert get_response.status_code == 404


def test_create_and_list_goals():
    """Test goal CRUD operations"""
    # Register user with unique email
    unique_id = str(uuid.uuid4())[:8]
    register_response = client.post(
        "/auth/register",
        json={
            "email": f"goal_test_{unique_id}@mira.local",
            "username": f"goaltest_{unique_id}",
            "password": "test1234",
            "full_name": "Goal Test",
        },
    )
    assert register_response.status_code == 201
    token = register_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Create goal
    create_response = client.post(
        "/goals",
        headers=headers,
        json={"title": "Test Goal", "description": "A test goal"},
    )
    assert create_response.status_code == 201
    goal = create_response.json()
    assert goal["title"] == "Test Goal"
    assert goal["status"] == "active"

    # List goals
    list_response = client.get("/goals", headers=headers)
    assert list_response.status_code == 200
    goals = list_response.json()
    assert len(goals) >= 1


def test_create_and_list_tasks():
    """Test task CRUD operations"""
    # Register user with unique email
    unique_id = str(uuid.uuid4())[:8]
    register_response = client.post(
        "/auth/register",
        json={
            "email": f"task_test_{unique_id}@mira.local",
            "username": f"tasktest_{unique_id}",
            "password": "test1234",
            "full_name": "Task Test",
        },
    )
    assert register_response.status_code == 201
    token = register_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Create task
    create_response = client.post(
        "/tasks",
        headers=headers,
        json={
            "title": "Test Task",
            "details": "A test task",
            "priority": "high",
        },
    )
    assert create_response.status_code == 201
    task = create_response.json()
    assert task["title"] == "Test Task"
    assert task["priority"] == "high"
    assert task["status"] == "todo"
    assert task["is_complete"] is False

    # List tasks
    list_response = client.get("/tasks", headers=headers)
    assert list_response.status_code == 200
    tasks = list_response.json()
    assert len(tasks) >= 1


def test_unauthorized_access():
    """Test that unauthorized access is denied"""
    response = client.get("/journeys")
    assert response.status_code == 401

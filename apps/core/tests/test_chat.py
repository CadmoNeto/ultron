from fastapi.testclient import TestClient
from ultron_core.main import app

client = TestClient(app)

def test_chat_returns_greeting_for_ola():
    response = client.post(
        "/chat",
        json={"message": "Olá, Ultorn"},
    )

    assert response.status_code == 200
    assert response.json() == {
        "message": "Olá, Cadmo."
    }

def test_chat_strips_whitespace_before_processing():
    response = client.post(
        "/chat",
        json={"message": "   Oi   "},
    )

    assert response.status_code == 200
    assert response.json() == {
        "message": "Oi, Cadmo.",
    }

def test_chat_rejects_blank_message():
    response = client.post(
        "/chat",
        json={"message": "   "},
    )

    assert response.status_code == 422
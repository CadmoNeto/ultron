from fastapi.testclient import TestClient
from ultron_core.main import app
from ultron_core.tools.system_status import SystemStatus

client = TestClient(app)

def test_system_status():
    response = client.get("/system_status")

    assert response.status_code == 200
    data = SystemStatus(**response.json())

    assert isinstance(data.cpu_percent, float)
    assert isinstance(data.memory_percent, float)
    assert isinstance(data.disk_percent, float)
    assert isinstance(data.uptime_seconds, int)
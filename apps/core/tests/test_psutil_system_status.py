from ultron_core.tools.psutil_system_status import PsutilSystemStatus
from ultron_core.tools.system_status import SystemStatus

def test_psutil_system_status_valid_status():
    provider = PsutilSystemStatus()

    status = provider.get_status()

    assert isinstance(status, SystemStatus)

    assert 0 <= status.cpu_percent <= 100
    assert 0 <= status.memory_percent <= 100
    assert 0 <= status.disk_percent <= 100
    assert status.uptime_seconds >= 0
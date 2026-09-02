from typing import Protocol
from .system_status import SystemStatus

class SystemStatusProvider(Protocol):
    def get_status(self) -> SystemStatus:
        ...
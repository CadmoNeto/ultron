from fastapi import APIRouter
from ..tools.protocol import SystemStatusProvider
from ..tools.system_status import SystemStatus

def creat_system_status_router(system_status_provider: SystemStatusProvider):
    system_status_router = APIRouter()

    @system_status_router.get("/system_status", response_model=SystemStatus)
    def system_status():
        response = system_status_provider.get_status()
        return response

    return system_status_router
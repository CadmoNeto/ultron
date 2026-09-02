import os
import time
import psutil
from .system_status import SystemStatus

class PsutilSystemStatus:
    def get_status(self) -> SystemStatus:
        root = os.path.abspath(os.sep)
        current_time = time.time()

        cpu = psutil.cpu_percent(interval=0.1)
        mem = psutil.virtual_memory()
        disk = psutil.disk_usage(root)
        boot_time = psutil.boot_time()

        cpu_percent = cpu
        memory_percent = mem.percent
        disk_percent = disk.percent
        uptime_seconds = int(current_time - boot_time)

        return SystemStatus(
            cpu_percent = cpu_percent,
            memory_percent = memory_percent,
            disk_percent = disk_percent,
            uptime_seconds = uptime_seconds
        )
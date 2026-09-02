import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.chat import create_chat_router
from .llm.fake import FakeLLM

from .api.system_status import creat_system_status_router
from .tools.psutil_system_status import PsutilSystemStatus

from .config.settings import settings
from .logging_config import setup_log


setup_log(settings.log_level)
logger = logging.getLogger(__name__)
logger.info("ULTRON Core Starting...")

if settings.llm_provider == "fake":
    llm = FakeLLM()
else:
    raise NotImplementedError(
        f"LLM provider '{settings.llm_provider}' is not implemented yet"
    )

system_status_provider = PsutilSystemStatus()

app = FastAPI(
    title="ULTRON Core",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "ultron-core",
    }

chat_router = create_chat_router(llm, system_status_provider)
app.include_router(chat_router)

system_status_router = creat_system_status_router(system_status_provider)
app.include_router(system_status_router)

def main():
    import uvicorn

    uvicorn.run(
        "ultron_core.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )
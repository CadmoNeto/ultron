from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.chat import create_chat_router
from .llm.fake import FakeLLM

llm = FakeLLM()

app = FastAPI(
    title="ULTRON Core",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
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

chat_router = create_chat_router(fakellm)
app.include_router(chat_router)
from fastapi import APIRouter
from pydantic import BaseModel, StringConstraints
from typing import Annotated
from ..orchestrator.chat import process_message
from ..llm.protocol import LLM
from ..tools.protocol import SystemStatusProvider

class ChatRequest(BaseModel):
    message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]

class ChatResponse(BaseModel):
    message: str


def create_chat_router(llm: LLM, system_status_provider: SystemStatusProvider) -> APIRouter:
    chat_router = APIRouter()

    @chat_router.post("/chat", response_model=ChatResponse)
    async def chat(request: ChatRequest):
        message = await process_message(request.message, llm, system_status_provider)
        response = ChatResponse(message=message)
        return response

    return chat_router
from fastapi import APIRouter
from pydantic import BaseModel, StringConstraints
from typing import Annotated
from ..orchestrator.chat import process_message
from ..llm.fake import FakeLLM

fakellm = FakeLLM()

class ChatRequest(BaseModel):
    message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]

class ChatResponse(BaseModel):
    message: str

chat_router = APIRouter()

@chat_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    message = await process_message(request.message, fakellm)
    response = ChatResponse(message=message)
    return response
from fastapi import APIRouter
from pydantic import BaseModel, StringConstraints
from ..orchestrator.chat import process_message
from typing import Annotated

class ChatRequest(BaseModel):
    message: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]

class ChatResponse(BaseModel):
    message: str

chat_router = APIRouter()

@chat_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    message = process_message(request.message)
    response = ChatResponse(message=message)
    return response
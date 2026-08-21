from fastapi import APIRouter
from pydantic import BaseModel, AfterValidator
from ..orchestrator.chat import process_message
from typing import Annotated

def not_empty(v: str) -> str:
    if v == "":
        raise ValueError("message cannot be empty")
    return v

class ChatRequest(BaseModel):
    message: Annotated[str, AfterValidator(not_empty)]

class ChatResponse(BaseModel):
    message: str

chat_router = APIRouter()

@chat_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    message = request.message.strip()
    message = process_message(message)
    response = ChatResponse(message=message)
    return response
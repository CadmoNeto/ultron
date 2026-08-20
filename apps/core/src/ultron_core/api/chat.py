from fastapi import APIRouter
from pydantic import BaseModel
from ..orchestrator.chat import process_message

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    message: str

chat_router = APIRouter()

@chat_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    message = process_message(request.message)
    response = ChatResponse(message=message)
    return response
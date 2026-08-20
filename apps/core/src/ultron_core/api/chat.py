from fastapi import APIRouter
from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str

chat_router = APIRouter()

@chat_router.post("/chat")
async def chat(request: ChatRequest):
    return {
        "message": request.message
    }
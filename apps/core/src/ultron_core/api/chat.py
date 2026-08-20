from fastapi import APIRouter

chat_router = APIRouter()

@chat_router.post("/chat")
async def chat(message):
    return {
        "message": message
    }
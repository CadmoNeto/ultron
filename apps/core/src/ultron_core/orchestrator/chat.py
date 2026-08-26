import logging
from ..llm.protocol import LLM

logger = logging.getLogger(__name__)

async def process_message(message: str, llm: LLM) -> str:
    logger.info("Chat processing started.")
    message_aux = message.lower()

    teste = await llm.generate(message_aux)
    logger.info("Chat processing completed.")
    print(teste)

    if message_aux.startswith(("olá", "ola")):
        return "Olá, Cadmo."
    elif message_aux.startswith("oi"):
        return "Oi, Cadmo."
    elif message_aux == "":
        return "Preciso que você diga algo..."
    else:
        return "Não entendi."
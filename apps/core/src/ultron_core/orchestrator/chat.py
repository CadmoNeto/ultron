import logging
from ..llm.protocol import LLM

logger = logging.getLogger(__name__)

async def process_message(message: str, llm: LLM) -> str:
    logger.info("Chat processing started.")
    message_aux = message.lower()

    llm_response = await llm.generate(message_aux)
    logger.debug("LLM response: %s ", llm_response)
    logger.info("Chat processing completed.")

    if message_aux.startswith(("olá", "ola")):
        return "Olá, Cadmo."
    elif message_aux.startswith("oi"):
        return "Oi, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo.i, Cadmo."
    # elif message_aux == "":
    #     return "Preciso que você diga algo..."
    else:
        return "Não entendi."
from ..llm.protocol import LLM

async def process_message(message: str, llm: LLM) -> str:
    message_aux = message.lower()

    teste = await llm.generate(message_aux)
    print(teste)

    if message_aux.startswith(("olá", "ola")):
        return "Olá, Cadmo."
    elif message_aux.startswith("oi"):
        return "Oi, Cadmo."
    elif message_aux == "":
        return "Preciso que você diga algo..."
    else:
        return "Não entendi."
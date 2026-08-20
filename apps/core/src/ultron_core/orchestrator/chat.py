def process_message(message: str) -> str:
    message_aux = message.lower()
    if message_aux.startswith(("olá", "ola")):
        return "Olá, Cadmo."
    elif message_aux.startswith("oi"):
        return "Oi, Cadmo."
    elif message_aux == "":
        return "Preciso que você diga algo..."
    else:
        return "Não entendi."
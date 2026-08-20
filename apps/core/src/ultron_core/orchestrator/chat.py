def process_message(message: str):
    message_aux = message.lower()
    if message_aux.startswith(("olá", "ola")):
        return "Olá, Cadmo"
    elif message_aux.startswith("oi"):
        return "Oi, Cadmo"
    else:
        return "Não entendi."
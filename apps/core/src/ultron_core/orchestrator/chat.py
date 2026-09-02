import logging
from ..llm.protocol import LLM
from ..tools.protocol import SystemStatusProvider

logger = logging.getLogger(__name__)

def format_uptime(seconds: int):
    days = seconds // 86400
    rem_sec = seconds % 86400

    hours = rem_sec // 3600
    rem_sec = rem_sec % 3600

    minutes = rem_sec // 60
    rem_sec = rem_sec % 60

    uptime = ""
    if days > 0:
        uptime = f"{days} dias, {hours} horas, {minutes} minutos e {rem_sec} segundos"
    elif hours > 0:
        uptime = f"{hours} horas, {minutes} minutos e {rem_sec} segundos"
    elif minutes > 0:
        uptime = f"{minutes} minutos e {rem_sec} segundos"
    else:
        uptime = f"{rem_sec} segundos"

    return uptime

async def process_message(message: str, llm: LLM, system_status_provider: SystemStatusProvider) -> str:
    logger.info("Chat processing started.")
    message_aux = message.lower()

    llm_response = await llm.generate(message_aux)
    logger.debug("LLM response: %s ", llm_response)
    logger.info("Chat processing completed.")

    message_return = ""

    if message_aux.startswith(("olá", "ola")):
        message_return = "Olá, Cadmo.\n"
    elif message_aux.startswith("oi"):
        message_return = "Oi, Cadmo.\n"
    
    if ("status" in message_aux) and ("computador" in message_aux):
        system_status = system_status_provider.get_status()

        uptime = format_uptime(system_status.uptime_seconds)
        
        message_return = (
            message_return + 
            f"\nO status atual do sistema é:\n"
            f"Uso de CPU: {system_status.cpu_percent}%\n"
            f"Uso de Memória: {system_status.memory_percent}%\n"
            f"Uso de Armazenamento (Disco Principal): {system_status.disk_percent}%\n"
            f"Tempo de Funcionamento: {uptime}\n")

    if message_return == "":
        message_return = "Não entendi."

    return message_return
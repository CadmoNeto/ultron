import asyncio
from ultron_core.orchestrator.chat import process_message
from ultron_core.tools.system_status import SystemStatus

class SpyLLM:
    def __init__(self):
        self.prompts: list[str] = []

    async def generate(self, prompt: str) -> str:
        self.prompts.append(prompt)
        return "resposta de teste"

class SpyTool:
    def get_status(self) -> SystemStatus:
        return SystemStatus(
            cpu_percent=10.0,
            memory_percent=20.0,
            disk_percent=30.0,
            uptime_seconds=1000
        )

def test_process_message_normalizes_prompt_before_calling_llm():
    llm = SpyLLM()
    tool = SpyTool()

    result = asyncio.run(
        process_message(
            "MENSAGEM DESCONHECIDA",
            llm,
            tool
        )
    )

    assert llm.prompts == [
        "mensagem desconhecida"
    ]

    assert result == "Não entendi."
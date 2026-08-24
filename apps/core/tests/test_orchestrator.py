import asyncio
from ultron_core.orchestrator.chat import process_message

class SpyLLM:
    def __init__(self):
        self.prompts: list[str] = []

    async def generate(self, prompt: str) -> str:
        self.prompts.append(prompt)
        return "resposta de teste"

def test_process_message_normalizes_prompt_before_calling_llm():
    llm = SpyLLM()

    result = asyncio.run(
        process_message(
            "MENSAGEM DESCONHECIDA",
            llm,
        )
    )

    assert llm.prompts == [
        "mensagem desconhecida"
    ]

    assert result == "Não entendi."
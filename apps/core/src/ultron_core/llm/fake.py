import logging
logger = logging.getLogger(__name__)
class FakeLLM:
    async def generate(self, prompt: str) -> str:
        logger.debug("LLM Provider initialized: fake")
        return f"FakeLLM recebeu: {prompt}"
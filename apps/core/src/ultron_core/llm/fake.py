class FakeLLM:
    async def generate(self, prompt: str) -> str:
        return f"FakeLLM recebeu: {prompt}"
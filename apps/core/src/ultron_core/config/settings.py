from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Literal

class Settings(BaseSettings):
    llm_provider: Literal["fake", "openai", "anthropic"] = "fake"
    # ENVIRONMENT = Literal["development", "production"] = "development"
    # LOG_LEVEL = Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "INFO"

    model_config = SettingsConfigDict(env_prefix="ULTRON_", env_file=".env", env_file_encoding="utf-8")

settings = Settings()

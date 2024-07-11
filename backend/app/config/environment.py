import logging
from typing import Literal

from pydantic import Field, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Environment(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    DATABASE_URL: str | None = Field(default=None)
    DB_HOST: str = Field(default="localhost")
    DB_PORT: str = Field(default="5432")
    DB_USER: str = Field(default="admin")
    DB_PASSWORD: str = Field(default="admin")
    DB_NAME: str = Field(default="database")
    SERVER_PORT: int = Field(default=8000)
    ENVIRONMENT: Literal["local", "dev", "prod"] = Field(default="local")
    DEBUG: bool = Field(default=False)
    ALGORITHM: str = Field(default="HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=30)
    SECRET_KEY: str = Field()
    CLIENT_HOST: str = Field(default="localhost")
    CLIENT_PORT: int = Field(default=5000)

    @computed_field
    @property
    def DB_URL(self) -> str:
        return (
            self.DATABASE_URL
            or f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )


env = Environment()

logging.debug(env.model_dump())

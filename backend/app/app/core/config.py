import secrets
from pydantic import BaseSettings, AnyHttpUrl, PostgresDsn, validator
from typing import List, Optional, Dict, Any

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())


class Settings(BaseSettings):
  PROJECT_NAME: str

  API_V1_STR: str = "/api/v1"
  SECRET_KEY: str = secrets.token_urlsafe(32)
  # 60 minutes * 24 hours * 8 days = 8 days
  ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
  BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

  POSTGRES_SERVER: str
  POSTGRES_PORT: int
  POSTGRES_USER: str
  POSTGRES_PASSWORD: str
  POSTGRES_DB: str
  SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

  @validator("SQLALCHEMY_DATABASE_URI", pre=True)
  def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:  # noqa
    if isinstance(v, str):
      return v
    return PostgresDsn.build(
      scheme="postgresql",
      user=values.get("POSTGRES_USER"),
      password=values.get("POSTGRES_PASSWORD"),
      host=f"{values.get('POSTGRES_SERVER')}:{values.get('POSTGRES_PORT')}",
      path=f"/{values.get('POSTGRES_DB') or ''}",
    )

  FIRST_SUPERUSER: str
  FIRST_SUPERUSER_PASSWORD: str


settings = Settings()

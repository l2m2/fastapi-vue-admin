import secrets
from pydantic import BaseSettings, AnyHttpUrl, PostgresDsn
from typing import List, Optional

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
  POSTGRES_USER: str
  POSTGRES_PASSWORD: str
  POSTGRES_DB: str
  SQLALCHEMY_DATABASE_URI: Optional[PostgresDsn] = None

  FIRST_SUPERUSER: str
  FIRST_SUPERUSER_PASSWORD: str
  USERS_OPEN_REGISTRATION: bool = False


settings = Settings()

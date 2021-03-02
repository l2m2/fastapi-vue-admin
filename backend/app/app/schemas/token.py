from typing import Optional

from pydantic import BaseModel


class TokenRes(BaseModel):
  access_token: str
  token_type: str


class TokenPayload(BaseModel):
  sub: Optional[int] = None

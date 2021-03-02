from pydantic import BaseModel


class MsgRes(BaseModel):
  msg: str

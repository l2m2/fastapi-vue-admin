from typing import Optional, List
from pydantic import BaseModel


class RoleBase(BaseModel):
  name: Optional[str] = None
  description: Optional[str] = None


class RoleCreate(RoleBase):
  name: str


class RoleUpdate(RoleBase):
  ...


class Role(RoleBase):
  id: Optional[int] = None

  class Config:
    orm_mode = True


class RoleList(BaseModel):
  total: int
  items: List[Role]

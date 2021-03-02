from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared properties
class UserBase(BaseModel):
  username: Optional[str] = None
  fullname: Optional[str] = None
  email: Optional[EmailStr] = None
  is_active: Optional[bool] = True
  is_superuser: bool = False


# Properties to receive via API on creation
class UserCreateReq(UserBase):
  username: str
  password: str


# Properties to receive via API on update
class UserUpdateReq(UserBase):
  password: Optional[str] = None


class UserRes(UserBase):
  id: Optional[int] = None

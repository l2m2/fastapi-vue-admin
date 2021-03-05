from typing import Optional, List, Dict
from pydantic import BaseModel

permission_conf_example = {
  "en": {
    "root": "System config",
    "group": "User management",
    "name": "Create"
  },
  "zhcn": {
    "root": "系统设置",
    "group": "用户管理",
    "name": "新建"
  }
}


class PermissionBase(BaseModel):
  conf: Optional[Dict[str, Dict[str, str]]] = None

  class Config:
    schema_extra = {"example": {"conf": permission_conf_example}}


class PermissionCreate(PermissionBase):
  code: str

  class Config:
    schema_extra = {"example": {"code": "sys-user-create", "conf": permission_conf_example}}


class PermissionUpdate(PermissionBase):
  ...


class Permission(PermissionBase):
  code: str

  class Config:
    orm_mode = True
    schema_extra = {"example": {"code": "sys-user-create", "conf": permission_conf_example}}


class PermissionList(BaseModel):
  total: int
  items: List[Permission]

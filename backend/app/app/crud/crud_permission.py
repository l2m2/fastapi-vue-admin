from typing import Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.permission import Permission
from app.schemas.permission import PermissionCreate, PermissionUpdate, PermissionList


class CRUDPermission(CRUDBase[Permission, PermissionCreate, PermissionUpdate, PermissionList]):
  def get_by_code(self, db: Session, *, code: str) -> Optional[Permission]:
    return db.query(Permission).filter(Permission.code == code).first()


permission = CRUDPermission(Permission)

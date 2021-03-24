from typing import List
from sqlalchemy.orm import Session

from app import models, schemas, crud


class CRUDRole(crud.CRUDBase[models.Role, schemas.RoleCreate, schemas.RoleUpdate, schemas.RoleList]):
  def get_permissions_by_role_id(self, db: Session, *, id: int) -> List[str]:
    return db.query(models.RolePermissionRel.permission_code).filter(models.RolePermissionRel.role_id == id).all()

  def update_permissions_by_role_id(self, db: Session, *, id: int, permissions: List[str]):
    delete_q = models.RolePermissionRel.__table__.delete().where(models.RolePermissionRel.role_id == id)
    db.execute(delete_q)
    db.add_all([models.RolePermissionRel(role_id=id, permission_code=x) for x in permissions])
    db.commit()


role = CRUDRole(models.Role)

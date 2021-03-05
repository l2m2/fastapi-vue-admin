from app.crud.base import CRUDBase
from app.models.role import Role
from app.schemas.role import RoleCreate, RoleUpdate, RoleList


class CRUDRole(CRUDBase[Role, RoleCreate, RoleUpdate, RoleList]):
  ...


role = CRUDRole(Role)

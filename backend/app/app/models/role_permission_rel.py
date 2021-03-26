from sqlalchemy import Column, String, Integer
from app.db.base import Base


class RolePermissionRel(Base):
  __tablename__ = "sys_role_permission_rel"

  role_id = Column(Integer, primary_key=True, index=True)
  permission_code = Column(String(255), primary_key=True)

  def __repr__(self):
    return f"<RolePermissionRel(role_id = {self.role_id}, permission_code = {self.permission_code})>"

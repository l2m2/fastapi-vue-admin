from sqlalchemy import Column, Integer
from app.db.base import Base


class UserRoleRel(Base):
  __tablename__ = "sys_user_role_rel"

  user_id = Column(Integer, primary_key=True, index=True)
  role_id = Column(Integer, primary_key=True)

  def __repr__(self):
    return f"<UserRoleRel(user_id = {self.user_id}, role_id = {self.role_id})>"

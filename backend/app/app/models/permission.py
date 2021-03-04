from sqlalchemy import Column, String
from sqlalchemy.dialects import postgresql
from app.db.base import Base


class Permission(Base):
  __tablename__ = "sys_permission"

  code = Column(String(20), primary_key=True, index=True)
  conf = Column(postgresql.JSONB, nullable=False)

  def __repr__(self):
    return f"<Permission(Code={self.code})>"

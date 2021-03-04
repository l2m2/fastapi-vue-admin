from sqlalchemy import String, Integer, Column
from app.db.base_class import Base


class Role(Base):
  __tablename__ = "sys_role"

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(20), unique=True, index=True, nullable=False)
  description = Column(String)

  def __repr__(self):
    return f"<Role(name={self.name})>"

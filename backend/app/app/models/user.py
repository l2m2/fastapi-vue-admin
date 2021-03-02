from sqlalchemy import Boolean, Column, Integer, String
from app.db.base_class import Base


class User(Base):
  __tablename__ = "sys_user"

  id = Column(Integer, primary_key=True, index=True)
  username = Column(String, unique=True, index=True, nullable=False)
  fullname = Column(String)
  email = Column(String)
  password = Column(String, nullable=False)
  is_active = Column(Boolean(), default=True)
  is_superuser = Column(Boolean(), default=False)

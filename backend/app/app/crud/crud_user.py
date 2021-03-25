from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session
from sqlalchemy import text, func, true

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.user import User
from app.models.user_role_rel import UserRoleRel
from app.schemas.user import UserCreate, UserUpdate, UserList


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate, UserList]):
  def get_by_username(self, db: Session, *, username: str) -> Optional[User]:
    return db.query(User).filter(User.username == username).first()

  def get_users(self, db: Session, *, skip: int = 0, limit: int = 100, filter: str = '', order: str = '') -> UserList:
    total = db.query(self.model).filter(text(filter)).count()
    subq = db.query(func.array_agg(UserRoleRel.role_id).label("roles")).filter(User.id == UserRoleRel.user_id).subquery().lateral()
    items = db.query(*[c for c in User.__table__.c],
                     subq).join(subq, true(), isouter=True).filter(text(filter)).order_by(text(order)).offset(skip).limit(limit).all()
    return {'total': total, 'items': items}

  def create(self, db: Session, *, obj_in: UserCreate) -> User:
    db_obj = User(
      username=obj_in.username,
      email=obj_in.email,
      password=get_password_hash(obj_in.password),
      fullname=obj_in.fullname,
      is_superuser=obj_in.is_superuser,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

  def update(self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]) -> User:
    if isinstance(obj_in, dict):
      update_data = obj_in
    else:
      update_data = obj_in.dict(exclude_unset=True)
    if "password" in update_data:
      hashed_password = get_password_hash(update_data["password"])
      del update_data["password"]
      update_data["password"] = hashed_password
    return super().update(db, db_obj=db_obj, obj_in=update_data)

  def authenticate(self, db: Session, *, username: str, password: str) -> Optional[User]:
    user = self.get_by_username(db, username=username)
    if not user:
      return None
    if not verify_password(password, user.password):
      return None
    return user

  def is_active(self, user: User) -> bool:
    return user.is_active

  def is_superuser(self, user: User) -> bool:
    return user.is_superuser


user = CRUDUser(User)

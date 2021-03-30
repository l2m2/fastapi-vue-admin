from typing import Any
from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=schemas.UserList)
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    filter: str = '',
    order: str = '',
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
  """
  获取用户列表
  """
  users = crud.user.get_users(db, skip=skip, limit=limit, filter=filter, order=order)
  return users


@router.post("/", response_model=schemas.User)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
  """
  创建用户
  """
  user = crud.user.get_by_username(db, username=user_in.username)
  if user:
    raise HTTPException(
      status_code=400,
      detail="系统中已存在相同的用户名.",
    )
  user = crud.user.create(db, obj_in=user_in)
  return user


@router.put("/me", response_model=schemas.User)
def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    password: str = Body(None),
    fullname: str = Body(None),
    email: EmailStr = Body(None),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
  """
  更新当前用户信息
  """
  current_user_data = jsonable_encoder(current_user)
  user_in = schemas.UserUpdate(**current_user_data)
  if password is not None:
    user_in.password = password
  if fullname is not None:
    user_in.fullname = fullname
  if email is not None:
    user_in.email = email
  user = crud.user.update(db, db_obj=current_user, obj_in=user_in)
  return user


@router.get("/me", response_model=schemas.UserMe)
def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
  """
  获取当前用户信息
  """
  permissions = crud.user.get_permissions_by_userid(db, user_id=current_user.id)
  ret = jsonable_encoder(current_user)
  ret["permissions"] = permissions
  return ret


@router.get("/{user_id}", response_model=schemas.User)
def read_user_by_id(
    user_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db),
) -> Any:
  """
  根据ID获取用户信息
  """
  user = crud.user.get(db, id=user_id)
  if user == current_user:
    return user
  if not crud.user.is_superuser(current_user):
    raise HTTPException(status_code=400, detail="The user doesn't have enough privileges")
  return user


@router.put("/{user_id}", response_model=schemas.User)
def update_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: schemas.UserUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
  """
  更新用户信息
  """
  user = crud.user.get(db, id=user_id)
  if not user:
    raise HTTPException(
      status_code=404,
      detail="用户不存在",
    )
  user = crud.user.update(db, db_obj=user, obj_in=user_in)
  return user


@router.delete("/{user_id}", response_model=schemas.User)
def delete_user(*, db: Session = Depends(deps.get_db), user_id: int,
                current_user: models.User = Depends(deps.get_current_active_superuser)):
  """
  删除用户
  """
  user = crud.user.get(db, id=user_id)
  if not user:
    raise HTTPException(status_code=404, detail="用户不存在")
  user = crud.user.remove(db, id=user_id)
  return user

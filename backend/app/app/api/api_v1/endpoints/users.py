from typing import Any, List
from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.UserRes])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
  """
  Retrieve users.
  """
  users = crud.user.get_multi(db, skip=skip, limit=limit)
  return users


@router.post("/", response_model=schemas.UserRes)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreateReq,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
  """
  Create new user.
  """
  user = crud.user.get_by_username(db, username=user_in.username)
  if user:
    raise HTTPException(
      status_code=400,
      detail="The user with this username already exists in the system.",
    )
  user = crud.user.create(db, obj_in=user_in)
  return user


@router.put("/me", response_model=schemas.UserRes)
def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    password: str = Body(None),
    fullname: str = Body(None),
    email: EmailStr = Body(None),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
  """
  Update own user.
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


@router.get("/me", response_model=schemas.UserRes)
def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
  """
  Get current user.
  """
  return current_user


@router.get("/{user_id}", response_model=schemas.UserRes)
def read_user_by_id(
    user_id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db),
) -> Any:
  """
  Get a specific user by id.
  """
  user = crud.user.get(db, id=user_id)
  if user == current_user:
    return user
  if not crud.user.is_superuser(current_user):
    raise HTTPException(status_code=400, detail="The user doesn't have enough privileges")
  return user


@router.put("/{user_id}", response_model=schemas.UserRes)
def update_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: schemas.UserUpdateReq,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
  """
  Update a user.
  """
  user = crud.user.get(db, id=user_id)
  if not user:
    raise HTTPException(
      status_code=404,
      detail="The user with this username does not exist in the system",
    )
  user = crud.user.update(db, db_obj=user, obj_in=user_in)
  return user

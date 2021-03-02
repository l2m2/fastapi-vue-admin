from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core import security
from app.core.config import settings
from app.core.security import get_password_hash

from app.utils import verify_password_reset_token

router = APIRouter()


@router.post("/login/access-token", response_model=schemas.Token)
def login_access_token(db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
  """
  OAuth2 compatible token login, get an access token for future requests
  """
  user = crud.user.authenticate(db, username=form_data.username, password=form_data.password)
  if not user:
    raise HTTPException(status_code=400, detail="Incorrect username or password")
  elif not crud.user.is_active(user):
    raise HTTPException(status_code=400, detail="Inactive user")
  access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
  return {
    "access_token": security.create_access_token(user.id, expires_delta=access_token_expires),
    "token_type": "bearer",
  }


@router.post("/login/test-token", response_model=schemas.User)
def test_token(current_user: models.User = Depends(deps.get_current_user)) -> Any:
  """
  Test access token
  """
  return current_user


@router.post("/reset-password/", response_model=schemas.Msg)
def reset_password(
    token: str = Body(...),
    new_password: str = Body(...),
    db: Session = Depends(deps.get_db),
) -> Any:
  """
  Reset password
  """
  email = verify_password_reset_token(token)
  if not email:
    raise HTTPException(status_code=400, detail="Invalid token")
  user = crud.user.get_by_email(db, email=email)
  if not user:
    raise HTTPException(
      status_code=404,
      detail="The user with this username does not exist in the system.",
    )
  elif not crud.user.is_active(user):
    raise HTTPException(status_code=400, detail="Inactive user")
  hashed_password = get_password_hash(new_password)
  user.hashed_password = hashed_password
  db.add(user)
  db.commit()
  return {"msg": "Password updated successfully"}

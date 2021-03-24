from fastapi import APIRouter, Depends, HTTPException
from typing import Any, List
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=schemas.RoleList)
def read_roles(db: Session = Depends(deps.get_db),
               skip: int = 0,
               limit: int = 100,
               filter: str = '',
               order: str = '',
               current_user: models.User = Depends(deps.get_current_active_superuser)) -> Any:
  """
  获取角色列表
  """
  roles = crud.role.get_multi(db, skip=skip, limit=limit, filter=filter, order=order)
  return roles


@router.post("/", response_model=schemas.Role)
def create_role(*,
                db: Session = Depends(deps.get_db),
                role_in: schemas.RoleCreate,
                current_user: models.User = Depends(deps.get_current_active_superuser)) -> Any:
  """
  创建角色
  """
  role = crud.role.create(db, obj_in=role_in)
  return role


@router.get("/{role_id}", response_model=schemas.Role)
def read_role_by_id(
  role_id: int, current_user: models.User = Depends(deps.get_current_active_user), db: Session = Depends(deps.get_db)) -> Any:
  """
  根据ID获取角色信息
  """
  role = crud.role.get(db, id=role_id)
  if not role:
    raise HTTPException(status_code=404, detail="角色不存在")
  return role


@router.put("/{role_id}", response_model=schemas.Role)
def update_role(*,
                db: Session = Depends(deps.get_db),
                role_id: int,
                role_in: schemas.RoleUpdate,
                current_user: models.User = Depends(deps.get_current_active_user)) -> Any:
  """
  更新角色信息
  """
  role = crud.role.get(db, id=role_id)
  if not role:
    raise HTTPException(status_code=404, detail="角色不存在")
  role = crud.role.update(db, db_obj=role, obj_in=role_in)
  return role


@router.delete("/{role_id}", response_model=schemas.Role)
def delete_role(*, db: Session = Depends(deps.get_db), role_id: int,
                current_user: models.User = Depends(deps.get_current_active_superuser)) -> Any:
  """
  删除角色
  """
  role = crud.role.get(db, id=role_id)
  if not role:
    raise HTTPException(status_code=404, detail="角色不存在")
  role = crud.role.remove(db, id=role_id)
  return role


@router.get("/{role_id}/permissions", response_model=List[str])
def read_role_permissions_by_id(*,
                                db: Session = Depends(deps.get_db),
                                role_id: int,
                                current_user: models.User = Depends(deps.get_current_active_superuser)):
  """
  读取角色的权限信息
  """
  role = crud.role.get(db, id=role_id)
  if not role:
    raise HTTPException(status_code=404, detail="角色不存在")
  return crud.role.get_permissions_by_role_id(db, id=role_id)


@router.put("/{role_id}/permissions")
def update_role_permissions_by_id(*,
                                  db: Session = Depends(deps.get_db),
                                  role_id: int,
                                  permissions_in: List[str],
                                  current_user: models.User = Depends(deps.get_current_active_superuser)):
  """
  更新角色的权限信息
  """
  role = crud.role.get(db, id=role_id)
  if not role:
    raise HTTPException(status_code=404, detail="角色不存在")
  crud.role.update_permissions_by_role_id(db, id=role_id, permissions=permissions_in)
  return True

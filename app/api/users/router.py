from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_async_session
from app.db.repository import UserRepository
from .schemas import User, UserCreate

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/create")
async def create_user(user_create: UserCreate,
                      session: AsyncSession = Depends(get_async_session)):
    try:
        await UserRepository.create_user(user_create=user_create,
                                         session=session)

        return {"status_code": 200, "detail": "User created successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("")
async def get_all_users(session: AsyncSession = Depends(get_async_session)) -> list[User]:
    try:
        users = await UserRepository.find_all(session=session)
        return users

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/is_user_exists")
async def is_user_exists(user_id: int,
                         session: AsyncSession = Depends(get_async_session)) -> bool:
    try:
        is_exists = await UserRepository.is_user_exists(user_id=user_id, session=session)
        return is_exists

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

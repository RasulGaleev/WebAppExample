from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_async_session
from app.db.repository import FavoriteRepository
from .schemas import Favorite, FavoriteCreate, ContentTypeEnum

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


@router.post("/create")
async def create_favorite(favorite_create: FavoriteCreate,
                          session: AsyncSession = Depends(get_async_session)):
    try:
        await FavoriteRepository.create_favorite(favorite_create=favorite_create,
                                                 session=session)

        return {"status_code": 200, "detail": "Favorite created successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/filter")
async def get_favorites_by_filter(user_id: int,
                                  content_type: ContentTypeEnum,
                                  session: AsyncSession = Depends(get_async_session)) -> list[Favorite]:
    try:
        favorites_by_content_type = await FavoriteRepository.find_by_user_id(user_id=user_id,
                                                                             content_type=content_type,
                                                                             session=session)
        return favorites_by_content_type

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete")
async def delete_favorite(favorite_id: int,
                          session: AsyncSession = Depends(get_async_session)):
    try:
        await FavoriteRepository.delete_by_id(favorite_id=favorite_id, session=session)
        return {"status_code": 200, "detail": "Favorite deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

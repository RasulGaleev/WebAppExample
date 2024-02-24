from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi.params import Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_async_session
from app.db.repository import CategoryRepository
from .schemas import Category

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.get("")
async def get_all_categories(session: AsyncSession = Depends(get_async_session)) -> list[Category]:
    try:
        categories = await CategoryRepository.find_all(session=session)
        return categories

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/filter")
async def get_category_by_filter(query: str = Query(None),
                                 session: AsyncSession = Depends(get_async_session)) -> List[Category]:
    try:
        categories_by_query = await CategoryRepository.find_by_query(query=query, session=session)
        return categories_by_query

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

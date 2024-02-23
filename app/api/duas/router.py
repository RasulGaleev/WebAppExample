from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_async_session
from app.db.repository import DuaRepository
from .schemas import Dua

router = APIRouter(
    prefix="/duas",
    tags=["Duas"]
)


@router.get("/filter")
async def get_duas_by_filter(dua_id: int = None,
                             chapter_id: int = None,
                             session: AsyncSession = Depends(get_async_session)) -> list[Dua]:
    try:
        duas = []
        if dua_id:
            duas = await DuaRepository.find_by_dua_id(dua_id=dua_id, session=session)
        elif chapter_id:
            duas = await DuaRepository.find_by_chapter_id(chapter_id=chapter_id, session=session)

        return duas

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

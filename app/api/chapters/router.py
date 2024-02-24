from fastapi import APIRouter, Depends, HTTPException
from fastapi.params import Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_async_session
from app.db.repository import ChapterRepository
from .schemas import Chapter

router = APIRouter(
    prefix="/chapters",
    tags=["Chapters"]
)


@router.get("")
async def get_all_chapters(session: AsyncSession = Depends(get_async_session)) -> list[Chapter]:
    try:
        all_chapters = await ChapterRepository.find_all(session=session)
        return all_chapters

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/filter")
async def get_chapters_by_filter(
        chapter_id: int = None,
        category_id: int = None,
        query: str = Query(None),
        session: AsyncSession = Depends(get_async_session)
) -> list[Chapter]:
    try:
        chapters = []
        if chapter_id:
            chapters = await ChapterRepository.find_by_chapter_id(chapter_id=chapter_id, session=session)
        elif category_id:
            chapters = await ChapterRepository.find_by_category_id(category_id=category_id, session=session)
        elif query:
            chapters = await ChapterRepository.find_by_query(query=query, session=session)

        return chapters

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_async_session
from app.db.repository import AdRepository
from .schemas import Ad, AdСreate

router = APIRouter(
    prefix="/ads",
    tags=["Ads"]
)


@router.post("/create")
async def create_ad(ad_create: AdСreate,
                    session: AsyncSession = Depends(get_async_session)):
    try:
        await AdRepository.create_ad(ad_create=ad_create,
                                     session=session)

        return {"status_code": 200, "detail": "Ad created successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/last")
async def get_last_ad(session: AsyncSession = Depends(get_async_session)) -> Optional[Ad]:
    try:
        last_ad = None
        ads = await AdRepository.find_all(session=session)
        if ads:
            last_ad = ads[-1]

        return last_ad

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

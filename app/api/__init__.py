from fastapi import APIRouter

from .categories.router import router as categories_router
from .chapters.router import router as chapters_router
from .duas.router import router as duas_router
from .favorites.router import router as favorites_router

router = APIRouter(
    prefix="/api",
    tags=["API"]
)
router.include_router(categories_router, )
router.include_router(chapters_router)
router.include_router(duas_router)
router.include_router(favorites_router)

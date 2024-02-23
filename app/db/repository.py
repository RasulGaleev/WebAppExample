from sqlalchemy import select, func, delete, insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.categories.models import CategoryOrm
from app.api.categories.schemas import Category
from app.api.chapters.models import ChapterOrm
from app.api.chapters.schemas import Chapter
from app.api.duas.models import DuaOrm
from app.api.duas.schemas import Dua
from app.api.favorites.models import FavoriteOrm
from app.api.favorites.schemas import Favorite, ContentTypeEnum, FavoriteCreate


class CategoryRepository:
    @classmethod
    async def find_all(cls, session: AsyncSession) -> list[Category]:
        query = select(CategoryOrm).order_by(CategoryOrm.id)
        result = await session.execute(query)
        category_models = result.scalars().all()
        category_schemas = [Category.model_validate(category_model) for category_model in category_models]
        return category_schemas

    @classmethod
    async def find_by_query(cls, query: str, session: AsyncSession) -> list[Category]:
        query = select(CategoryOrm).filter(CategoryOrm.category.ilike(f"%{query}%")).order_by(CategoryOrm.id)
        result = await session.execute(query)
        category_models = result.scalars().all()
        category_schemas = [Category.model_validate(category_model) for category_model in category_models]
        return category_schemas


class ChapterRepository:
    @classmethod
    async def find_all(cls, session: AsyncSession) -> list[Chapter]:
        query = (
            select(
                ChapterOrm.id,
                ChapterOrm.chapter,
                ChapterOrm.category_id,
                func.count(DuaOrm.id).label("dua_count")
            )
            .join(DuaOrm, ChapterOrm.id == DuaOrm.chapter_id)
            .group_by(ChapterOrm.id)
            .order_by(ChapterOrm.id)
        )
        result = await session.execute(query)
        chapter_models = result.all()
        chapter_schemas = [Chapter.model_validate(chapter_model) for chapter_model in chapter_models]
        return chapter_schemas

    @classmethod
    async def find_by_chapter_id(cls, chapter_id: int, session: AsyncSession) -> list[Chapter]:
        query = (
            select(
                ChapterOrm.id,
                ChapterOrm.chapter,
                ChapterOrm.category_id,
                func.count(ChapterOrm.id).label("dua_count")
            ).join(DuaOrm, ChapterOrm.id == DuaOrm.chapter_id).filter(
                ChapterOrm.id == chapter_id
            )
            .group_by(ChapterOrm.id)
            .order_by(ChapterOrm.id)
        )
        result = await session.execute(query)
        chapter_models = result.all()
        chapter_schemas = [Chapter.model_validate(chapter_model) for chapter_model in chapter_models]
        return chapter_schemas

    @classmethod
    async def find_by_category_id(cls, category_id: int, session: AsyncSession) -> list[Chapter]:
        query = (
            select(
                ChapterOrm.id,
                ChapterOrm.chapter,
                ChapterOrm.category_id,
                func.count(ChapterOrm.id).label("dua_count")
            ).join(DuaOrm, ChapterOrm.id == DuaOrm.chapter_id).filter(
                ChapterOrm.category_id == category_id
            )
            .group_by(ChapterOrm.id)
            .order_by(ChapterOrm.id)
        )
        result = await session.execute(query)
        chapter_models = result.all()
        chapter_schemas = [Chapter.model_validate(chapter_model) for chapter_model in chapter_models]
        return chapter_schemas

    @classmethod
    async def find_by_query(cls, query: str, session: AsyncSession) -> list[Chapter]:
        query = (
            select(
                ChapterOrm.id,
                ChapterOrm.chapter,
                ChapterOrm.category_id,
                func.count(ChapterOrm.id).label("dua_count")
            ).join(DuaOrm, ChapterOrm.id == DuaOrm.chapter_id).filter(
                ChapterOrm.chapter.ilike(f"%{query}%")
            )
            .group_by(ChapterOrm.id)
            .order_by(ChapterOrm.id)
        )
        result = await session.execute(query)
        chapter_models = result.all()
        chapter_schemas = [Chapter.model_validate(chapter_model) for chapter_model in chapter_models]
        return chapter_schemas


class DuaRepository:

    @classmethod
    async def find_by_dua_id(cls, dua_id: int, session: AsyncSession) -> list[Dua]:
        query = select(DuaOrm).filter(DuaOrm.id == dua_id).order_by(DuaOrm.id)
        result = await session.execute(query)
        dua_models = result.scalars().all()
        dua_schemas = [Dua.model_validate(dua_model) for dua_model in dua_models]
        return dua_schemas

    @classmethod
    async def find_by_chapter_id(cls, chapter_id: int, session: AsyncSession) -> list[Dua]:
        query = select(DuaOrm).filter(DuaOrm.chapter_id == chapter_id).order_by(DuaOrm.id)
        result = await session.execute(query)
        dua_models = result.scalars().all()
        dua_schemas = [Dua.model_validate(dua_model) for dua_model in dua_models]
        return dua_schemas


class FavoriteRepository:
    @classmethod
    async def find_all(cls, session: AsyncSession) -> list[Favorite]:
        query = select(FavoriteOrm).order_by(FavoriteOrm.id)
        result = await session.execute(query)
        favorite_models = result.scalars().all()
        favorite_schemas = [Favorite.model_validate(favorite_model) for favorite_model in favorite_models]
        return favorite_schemas

    @classmethod
    async def find_by_user_id(cls, user_id: int, content_type: ContentTypeEnum,
                              session: AsyncSession) -> list[Favorite]:
        query = select(FavoriteOrm).filter(FavoriteOrm.content_type == content_type,
                                           FavoriteOrm.user_id == user_id).order_by(FavoriteOrm.id)
        result = await session.execute(query)
        favorite_models = result.scalars().all()
        favorite_schemas = [Favorite.model_validate(favorite_model) for favorite_model in favorite_models]
        return favorite_schemas

    @classmethod
    async def create_favorite(cls, favorite_create: FavoriteCreate, session: AsyncSession):
        stmt = insert(FavoriteOrm).values(**favorite_create.model_dump())
        await session.execute(stmt)
        await session.commit()

    @classmethod
    async def delete_by_id(cls, favorite_id: int, session: AsyncSession):
        stmt = delete(FavoriteOrm).filter(FavoriteOrm.id == favorite_id)
        await session.execute(stmt)
        await session.commit()

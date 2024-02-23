from typing import AsyncGenerator

from sqlalchemy import URL
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from config import config

postgres_url = URL.create(
    "postgresql+asyncpg",
    username=config.db.user,
    password=config.db.password,
    host=config.db.host,
    database=config.db.name,
    port=config.db.port
)


class Model(DeclarativeBase):
    pass


engine = create_async_engine(postgres_url)


def create_session_maker() -> sessionmaker:
    return sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with create_session_maker()() as session:
        yield session

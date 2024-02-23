from datetime import datetime
from typing import Optional

from sqlalchemy import select, ScalarResult
from sqlalchemy.orm import Mapped, mapped_column, sessionmaker

from app.db import Model


class UserOrm(Model):
    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[Optional[str]]
    first_name: Mapped[Optional[str]]
    last_name: Mapped[Optional[str]]
    creation_date: Mapped[datetime] = mapped_column(default=datetime.utcnow())


class UserRepository:
    @classmethod
    async def create_user(cls, user_id: int, username: str, first_name: str, last_name: str,
                          session_maker: sessionmaker) -> None:
        async with session_maker() as session:
            async with session.begin():
                user = UserOrm(
                    user_id=user_id,
                    username=username,
                    first_name=first_name,
                    last_name=last_name,
                )
                session.add(user)

    @classmethod
    async def is_user_exists(cls, user_id: int, session_maker: sessionmaker) -> bool:
        async with session_maker() as session:
            async with session.begin():
                sql_result = await session.execute(select(UserOrm).where(UserOrm.user_id == user_id))
                sql_result_bool = bool(sql_result.scalar())
                return sql_result_bool

    @classmethod
    async def get_all_user_ids(cls, session_maker: sessionmaker) -> ScalarResult[int]:
        async with session_maker() as session:
            async with session.begin():
                result = await session.execute(
                    select(UserOrm.user_id)
                )
                return result.scalars()

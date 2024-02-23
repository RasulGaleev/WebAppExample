from enum import Enum

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Model


class ContentTypeEnum(str, Enum):
    chapter = "chapter"
    dua = "dua"


class FavoriteOrm(Model):
    __tablename__ = "favorites"

    id: Mapped[int] = mapped_column(primary_key=True)
    content_type: Mapped[ContentTypeEnum] = mapped_column(nullable=False)
    content_id: Mapped[int]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.user_id"))

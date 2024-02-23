from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.api.categories.models import CategoryOrm
from app.db import Model


class ChapterOrm(Model):
    __tablename__ = "chapters"

    id: Mapped[int] = mapped_column(primary_key=True)
    chapter: Mapped[str]
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))

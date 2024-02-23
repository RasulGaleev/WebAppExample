from typing import Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Model


class DuaOrm(Model):
    __tablename__ = "duas"

    id: Mapped[int] = mapped_column(primary_key=True)
    arab: Mapped[Optional[str]]
    transcript: Mapped[Optional[str]]
    translate: Mapped[Optional[str]]
    source: Mapped[str]
    audio: Mapped[Optional[str]]
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"))

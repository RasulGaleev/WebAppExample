from sqlalchemy.orm import Mapped, mapped_column

from app.db import Model


class AdOrm(Model):
    __tablename__ = "ads"

    id: Mapped[int] = mapped_column(primary_key=True)
    img: Mapped[str]
    url: Mapped[str]

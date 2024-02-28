from datetime import datetime
from typing import Optional

from sqlalchemy.orm import Mapped, mapped_column

from app.db import Model


class UserOrm(Model):
    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[Optional[str]]
    first_name: Mapped[Optional[str]]
    last_name: Mapped[Optional[str]]
    creation_date: Mapped[datetime] = mapped_column(default=datetime.utcnow())

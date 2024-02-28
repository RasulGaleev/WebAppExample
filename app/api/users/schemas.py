from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class UserCreate(BaseModel):
    user_id: int
    username: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    model_config: ConfigDict = ConfigDict(from_attributes=True)


class User(UserCreate):
    creation_date: datetime

from pydantic import BaseModel, ConfigDict

from .models import ContentTypeEnum


class FavoriteCreate(BaseModel):
    content_id: int
    content_type: ContentTypeEnum
    user_id: int
    model_config: ConfigDict = ConfigDict(from_attributes=True)


class FavoriteDelete(FavoriteCreate):
    pass


class Favorite(FavoriteCreate):
    id: int

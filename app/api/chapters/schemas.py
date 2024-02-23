from pydantic import BaseModel, ConfigDict


class Chapter(BaseModel):
    id: int
    chapter: str
    dua_count: int
    category_id: int
    model_config = ConfigDict(from_attributes=True)


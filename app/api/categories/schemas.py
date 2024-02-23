from pydantic import BaseModel, ConfigDict


class Category(BaseModel):
    id: int
    category: str
    model_config = ConfigDict(from_attributes=True)

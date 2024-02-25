from pydantic import BaseModel, ConfigDict


class AdСreate(BaseModel):
    img: str
    url: str
    model_config = ConfigDict(from_attributes=True)


class Ad(AdСreate):
    id: int


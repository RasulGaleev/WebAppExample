from typing import Optional

from pydantic import BaseModel, ConfigDict


class Dua(BaseModel):
    id: int
    arab: Optional[str]
    transcript: Optional[str]
    translate: Optional[str]
    source: str
    audio: Optional[str]
    chapter_id: int
    model_config = ConfigDict(from_attributes=True)

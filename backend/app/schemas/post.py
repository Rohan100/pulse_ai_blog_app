from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PostCreate(BaseModel):
    title: str
    content: str
    author: Optional[str] = None

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    author: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
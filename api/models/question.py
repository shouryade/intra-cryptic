from pydantic import BaseModel
from fastapi import Form
from typing import List, Optional


class Question(BaseModel):
    ques: str = Form(...)
    number: int = Form(...)
    images: List[str]
    answer: str = Form(...)

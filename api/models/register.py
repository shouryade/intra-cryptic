from pydantic import BaseModel
from fastapi import Form


class registerUser(BaseModel):
    username: str = Form(...)
    email: str = Form(...)
    password: str = Form(...)
    level: int = 1

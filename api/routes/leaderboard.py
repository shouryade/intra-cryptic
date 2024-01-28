from fastapi import APIRouter, Depends, Form, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from ..utils import get_current_user
from ..models.register import registerUser
from ..models.question import Question
from ..logger import log
from ..config.db import questions, collection

router = APIRouter(prefix="/api/leaderboard", tags=["leaderboard"])


@router.get("/get")
async def get_leaderboard():
    top_users_cursor = collection.find().sort("level", -1).limit(10)
    top_users = [
        dict(username=user["username"], level=user["level"])
        for user in top_users_cursor
    ]
    return top_users

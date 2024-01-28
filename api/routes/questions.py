from fastapi import APIRouter, Depends, Form, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from ..utils import get_current_user
from ..models.register import registerUser
from ..models.question import Question
from ..logger import log
from ..config.db import questions, collection

router = APIRouter(prefix="/api/questions", tags=["questions"])


@router.post("/add")
async def add_question(
    current_user: Annotated[registerUser, Depends(get_current_user)],
    ques: str = Form(...),
    number: int = Form(...),
    answer: str = Form(...),
):
    if ques and number and (current_user["email"] == "moisture@123"):
        questions.insert_one(
            {
                "ques": ques,
                "number": number,
                "answer": answer,
            }
        )

        return {"message": "Question added successfully."}
    else:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Invalid question. Please put the question correctly.",
        )


@router.get("/get")
async def get_questions(
    current_user: Annotated[registerUser, Depends(get_current_user)],
):
    question_doc = questions.find_one({"number": current_user["level"]})
    if question_doc:
        question_doc.pop("_id")

        question = question_doc
        return question
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found for the current level.",
        )


@router.post("/verify")
async def answer_question(
    current_user: Annotated[registerUser, Depends(get_current_user)],
    ans: str = Form(...),
):
    question_doc = questions.find_one({"number": current_user["level"]})
    if question_doc:
        if ans == question_doc["answer"]:
            collection.update_one(
                {"email": current_user["email"]},
                {"$inc": {"level": 1}},
            )
            return {"message": "Correct answer."}
        else:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Wrong answer. Please try again.",
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found for the current level.",
        )

from fastapi import FastAPI
import uvicorn
from .config.db import db_ping

app = FastAPI(title="Cryptic")
# from .routes import auth
# from .routes import leaderboard
# from .routes import questions

# app.include_router(auth.router)
# app.include_router(questions.router)
# app.include_router(leaderboard.router)


@app.on_event("startup")
async def startup():
    db_ping()


@app.get("/")
async def hello():
    return {"msg": "hello from the backend!"}


if __name__ == "__main__":
    uvicorn.run("app:app", reload=True, host="127.0.0.1", port=8100)

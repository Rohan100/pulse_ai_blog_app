from fastapi import FastAPI
from app.api.posts import router
from app.db.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Pulse AI Blog")
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)


    sdfsdf
    
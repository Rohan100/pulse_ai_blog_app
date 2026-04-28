from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.crud.posts_crud import create_post, read_post, delete_post
from app.schemas.post import PostCreate, PostResponse
from app.db.database import get_db

router = APIRouter(prefix="/posts", tags=["posts"])

@router.post("", response_model=PostResponse, status_code=201)
def create(post: PostCreate, db: Session = Depends(get_db)):
    return create_post(db, post)

@router.get("/{post_id}", response_model=PostResponse)
def read(post_id: int, db: Session = Depends(get_db)):
    post = read_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.delete("/{post_id}", status_code=204)
def delete(post_id: int, db: Session = Depends(get_db)):
    if not delete_post(db, post_id):
        raise HTTPException(status_code=404, detail="Post not found")
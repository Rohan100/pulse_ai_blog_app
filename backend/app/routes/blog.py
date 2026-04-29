from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.data import BLOG_DATA

router = APIRouter(prefix="/blog", tags=["blog"])


@router.get("/{title}")
def get_blog_by_title(title: str):
    if title in BLOG_DATA:
        return BLOG_DATA[title]
    return JSONResponse(status_code=404, content={"error": "Blog not found"})


@router.get("/titles/all")
def get_blog_titles():
    return {"titles": sorted(BLOG_DATA.keys())}

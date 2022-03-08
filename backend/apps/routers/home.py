from typing import List

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from database import get_db

from .. import schemas
from ..repository import home

router = APIRouter(
    prefix="/main",
    tags=["main"],
)


@router.get("/{category}", response_model=schemas.KeywordList)
def call_keywords(category: str):
    return home.call_keywords(category)


@router.post("/recommandList", response_model=List[schemas.ProductList])
def keywords_similarity(
    request: schemas.KeywordCategoryList, db: Session = Depends(get_db)
):
    return home.keywords_similarity(request, db)

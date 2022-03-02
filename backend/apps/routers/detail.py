from typing import List

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from database import get_db

from .. import schemas
from ..repository import detail

router = APIRouter(
    prefix="/detail",
    tags=["detail"],
)

# @router.post("/category", response_model=List[schemas.ProductList])
# def search_category(request: schemas.SearchCategory, db: Session = Depends(get_db)):
#     return search.get_product_by_category(db, request)


@router.get("/{id}", response_model=schemas.ProductList)
def product_detail_by_id(id: int, db: Session = Depends(get_db)):
    return detail.get_product_by_id(id, db)

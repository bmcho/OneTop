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


@router.get("/{id}", response_model=schemas.ProductDetail)
def product_detail_by_id(id: int, db: Session = Depends(get_db)):
    return detail.get_product_by_id(id, db)

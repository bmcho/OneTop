from typing import List

from fastapi import HTTPException, Request, Response, status
from sqlalchemy.orm import Session

from .. import models, schemas


def get_product_by_id(id: int, db: Session):
    product_detail = db.query(models.Dummy).filter(models.Dummy.id == id).first()
    print(product_detail)
    return product_detail

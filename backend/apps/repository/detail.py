from typing import List

from fastapi import HTTPException, Request, Response, status
from sqlalchemy.orm import Session

import models as models

from .. import schemas


def get_product_by_id(id: int, db: Session):
    product = schemas.ProductList
    product = db.query(models.Product).filter(models.Product.product_num == id).first()

    product_detail = schemas.ProductDetail

    # Product table 정보들 옮기기.
    product_detail.product_num = product.product_num
    product_detail.name = product.name
    product_detail.img_url = product.img_url
    product_detail.brand = product.brand
    product_detail.average_rating = product.average_rating
    product_detail.price = product.price

    # Descrip table 정보들 옮기기.
    description = schemas.ProductDescription
    description = (
        db.query(models.Descrip)
        .filter(models.Descrip.fk_product_descrip_product_num == id)
        .first()
    )
    product_detail.description = description.description
    product_detail.hashtag = description.hashtag

    # id를 product_num으로 가지는 Ingredient테이블의 성분들을 다 가져옴.
    ingredientFilterList = (
        db.query(models.Ingredient)
        .join(models.Product, models.Ingredient._products)
        .filter(models.Product.product_num == id)
        .all()
    )
    product_detail.ingredientList = ingredientFilterList

    return product_detail

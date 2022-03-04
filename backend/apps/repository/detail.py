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

    #     productList = (
    #     db.query(models.Product)
    #     .join(models.Descrip)
    #     .filter(
    #         (models.Descrip.major_classification.like(searchLarge))
    #         & (models.Descrip.medium_classification.like(searchSmall))
    #     )
    #     .all()
    # )

    # Descrip table 정보들 옮기기.
    description = schemas.ProductDescription
    description = (
        db.query(models.Descrip)
        .filter(models.Descrip.fk_product_descrip_product_num == id)
        .first()
    )
    product_detail.description = description.description
    product_detail.hashtag = description.hashtag

    # Ingredient table 정보들 옮기기.

    # product_detail.ingredients= db.query(models.Product)

    return product_detail

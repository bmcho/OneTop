from typing import List

from fastapi import HTTPException, Request, Response, status
from sqlalchemy.orm import Session

import models as models

from .. import schemas


def get_product_by_category(db: Session, request: schemas.SearchCategory):
    largeCategory = request.largeCategory
    smallCategory = request.smallCategory

    searchLarge = "%{}%".format(largeCategory)
    searchSmall = "%{}%".format(smallCategory)

    productList = (
        db.query(models.Dummy)
        .filter(
            (models.Dummy.major_classification.like(searchLarge))
            & (models.Dummy.medium_classification.like(searchSmall))
        )
        .all()
    )
    # listLen = len(productList)
    # productList["totalPageCount"] = int(listLen / request.maxItemCountByPage)
    # productList["currentPage"] = request.requestPage
    return productList


def get_product_by_keyword(db: Session, request: schemas.SearchKeyword):
    search_keyword = request.keyword
    searchType = request.searchResultType
    search = "%{}%".format(search_keyword)

    if searchType == "product":
        productList = (
            db.query(models.Product).filter(models.Product.name.like(search)).first()
        )
    elif searchType == "brand":
        search = search.upper()
        productList = (
            db.query(models.Product).filter(models.Product.brand.like(search)).all()
        )
    # elif searchType == "ingredient":
    #     productList = (
    #         db.query(models.Product).filter(models.Product.ingredients.like(search)).all()
    #     )
    # 성분은 참조테이블이 따로 있어서 구현을 다시 생각해봐야할듯.

    # listLen = len(productList)
    # searchResult = schemas.SearchResult
    # searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    # searchResult.currentPage=request.requestPage
    return productList


# def get_product_by_ingredient(db:Session, request:schemas.SearchIngredients):
#     includeIngredient=request.includeIngredient
#     excludeIngredient=request.excludeIngredient

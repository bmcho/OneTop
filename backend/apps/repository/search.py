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

    # productList = (
    #     db.query(models.Product)
    #     .filter(
    #         (models.Product._descriptions.major_classification.like(searchLarge))
    #         & (models.Product._descriptions.medium_classification.like(searchSmall))
    #     )
    #     .all()
    # )
    productList = (
        db.query(models.Product)
        .join(models.Descrip)
        .filter(
            (models.Descrip.major_classification.like(searchLarge))
            & (models.Descrip.medium_classification.like(searchSmall))
        )
        .all()
    )

    listLen = len(productList)
    searchResult = schemas.SearchResult
    searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    searchResult.currentPage = request.requestPage
    searchResult.result = productList
    return searchResult


def get_product_by_keyword(db: Session, request: schemas.SearchKeyword):
    search_keyword = request.keyword
    searchType = request.searchResultType
    search = "%{}%".format(search_keyword)

    if searchType == "product":
        productList = (
            db.query(models.Product).filter(models.Product.name.like(search)).all()
        )
    elif searchType == "brand":
        search = search.upper()
        productList = (
            db.query(models.Product).filter(models.Product.brand.like(search)).all()
        )
    elif searchType == "ingredient":
        # keyword와 일치하는 성분을 성분테이블에서 찾음.
        # ingredientList = schemas.IngredientList
        # ingredientList = (
        #     db.query(models.Ingredient)
        #     .filter(models.Ingredient.ko_ingredient.like(search))
        #     .all()
        # )
        # print(ingredientList)

        """
        성분테이블에서 가져온 id를 통해 productingredientrelation에서
        product_id를 가져옴.
        """

        # productIdList = schemas.ProductIdList
        # for i in range(len(ingredientList)):
        #     productId = (
        #         db.query(models.productingredientrelation)
        #         .filter(
        #             models.productingredientrelation.c.ingredient_id
        #             == ingredientList[i]
        #         )
        #         .all()
        #     )
        #     productIdList.append(productId)

        # productList = []

        # for i in range(len(productIdList)):
        #     product = (
        #         db.query(models.Product)
        #         .filter(models.Product.product_num == productIdList[i])
        #         .all()
        #     )
        #     productList.append(product)

    listLen = len(productList)
    searchResult = schemas.SearchResult
    searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    searchResult.currentPage = request.requestPage
    searchResult.result = productList
    return searchResult


# def get_product_by_ingredient(db:Session, request:schemas.SearchIngredients):
#     includeIngredient=request.includeIngredient
#     excludeIngredient=request.excludeIngredient

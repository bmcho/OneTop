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

    currentPage = request.requestPage
    perPage = request.maxItemCountByPage

    offset = currentPage * perPage
    limit = offset + perPage
    productList = (
        db.query(models.Product)
        .join(models.Descrip, models.Product._descriptions)
        .filter(
            (models.Descrip.major_classification.like(searchLarge))
            & (models.Descrip.medium_classification.like(searchSmall))
        )
        .all()
    )
    showList = productList[offset:limit]

    listLen = len(productList)
    searchResult = schemas.SearchResult
    searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    searchResult.currentPage = request.requestPage
    searchResult.result = showList
    return searchResult


def get_product_by_keyword(db: Session, request: schemas.SearchKeyword):
    search_keyword = request.keyword
    searchType = request.searchResultType
    search = "%{}%".format(search_keyword)

    currentPage = request.requestPage
    perPage = request.maxItemCountByPage

    offset = currentPage * perPage
    limit = offset + perPage
    if searchType == "product":
        productList = (
            db.query(models.Product).filter(models.Product.name.like(search)).all()
        )
        showList = productList[offset:limit]
    elif searchType == "brand":
        search = search.upper()
        productList = (
            db.query(models.Product).filter(models.Product.brand.like(search)).all()
        )
        showList = productList[offset:limit]

    # keyword를 ko_ingredient로 가지는 Product테이블의 row들을 다 가져옴.
    elif searchType == "ingredient":
        productList = (
            db.query(models.Product)
            .join(models.Ingredient, models.Product._ingredients)
            .filter(models.Ingredient.ko_ingredient.like(search))
            .all()
        )
        showList = productList[offset:limit]

    listLen = len(productList)
    searchResult = schemas.SearchResult
    searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    searchResult.currentPage = request.requestPage

    searchResult.result = showList
    return searchResult


def get_product_by_ingredient(db: Session, request: schemas.SearchIngredients):
    includeIngredient = request.includeIngredient
    excludeIngredient = request.excludeIngredient

    currentPage = request.requestPage
    perPage = request.maxItemCountByPage

    offset = currentPage * perPage
    limit = offset + perPage

    productList = (
        db.query(models.Product)
        .join(models.Ingredient, models.Product._ingredients)
        .filter(
            models.Ingredient.ko_ingredient.in_(includeIngredient)
            & models.Ingredient.ko_ingredient.not_in(excludeIngredient)
        )
        .all()
    )
    showList = productList[offset:limit]
    listLen = len(productList)
    searchResult = schemas.SearchResult
    searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    searchResult.currentPage = request.requestPage

    searchResult.result = showList
    return searchResult

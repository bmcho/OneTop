from typing import List

from fastapi import HTTPException, Request, Response, status
from sqlalchemy import and_, or_
from sqlalchemy.orm import Session

import models as models

from .. import schemas

"""
정렬: order_by(desc, insc로 오름차순, 내림차순 구현.)

자동완성: 글자 하나를 기준으로 product,brand,ingredient를 검색한 뒤 limit(10)으로
10개씩 긁어서 총 3개의 배열형태로 넘겨준다.
"""
# def return_keywords_list(db:Session,keyword:str):

# def return_sort_list(db:Session, sort:str , type:str):
#     if sort=="name desc":
#         if type=="category":
#             productList = (
#             db.query(models.Product)
#             .join(models.Descrip, models.Product._descriptions)
#             .filter(
#                 (models.Descrip.major_classification.like(searchLarge))
#                 & (models.Descrip.medium_classification.like(searchSmall))
#             )
#             .order_by(models.Product.name.desc())
#             .all()
#             )
#         # if type=="keyword":
#         # if type=="ingredient":
#     if sort=="name asc":
#         if type=="category":
#             productList = (
#             db.query(models.Product)
#             .join(models.Descrip, models.Product._descriptions)
#             .filter(
#                 (models.Descrip.major_classification.like(searchLarge))
#                 & (models.Descrip.medium_classification.like(searchSmall))
#             )
#             .order_by(models.Product.name)
#             .all()
#             )
#         # if type=="keyword":
#         # if type=="ingredient":
#     if sort=="price desc":
#         if type=="category":
#             productList = (
#             db.query(models.Product)
#             .join(models.Descrip, models.Product._descriptions)
#             .filter(
#                 (models.Descrip.major_classification.like(searchLarge))
#                 & (models.Descrip.medium_classification.like(searchSmall))
#             )
#             .order_by(models.Product.price.desc())
#             .all()
#             )
#         # if type=="keyword":
#         # if type=="ingredient":
#     if sort=="price asc":
#         if type=="category":
#             productList = (
#             db.query(models.Product)
#             .join(models.Descrip, models.Product._descriptions)
#             .filter(
#                 (models.Descrip.major_classification.like(searchLarge))
#                 & (models.Descrip.medium_classification.like(searchSmall))
#             )
#             .order_by(models.Product.price)
#             .all()
#             )
#         # if type=="keyword":
#         # if type=="ingredient":

#     return productList


def get_product_by_category(db: Session, request: schemas.SearchCategory):
    largeCategory = request.largeCategory
    smallCategory = request.smallCategory
    sort = request.sort

    searchLarge = "%{}%".format(largeCategory)
    searchSmall = "%{}%".format(smallCategory)

    currentPage = request.requestPage
    perPage = request.maxItemCountByPage

    offset = currentPage * perPage
    limit = offset + perPage
    if sort == "name desc":
        productList = (
            db.query(models.Product)
            .join(models.Descrip, models.Product._descriptions)
            .filter(
                (models.Descrip.major_classification.like(searchLarge))
                & (models.Descrip.medium_classification.like(searchSmall))
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc())
            .order_by(models.Product.name.desc())
            .all()
        )
    if sort == "name asc":
        productList = (
            db.query(models.Product)
            .join(models.Descrip, models.Product._descriptions)
            .filter(
                (models.Descrip.major_classification.like(searchLarge))
                & (models.Descrip.medium_classification.like(searchSmall))
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc())
            .order_by(models.Product.name)
            .all()
        )
    if sort == "price desc":
        productList = (
            db.query(models.Product)
            .join(models.Descrip, models.Product._descriptions)
            .filter(
                (models.Descrip.major_classification.like(searchLarge))
                & (models.Descrip.medium_classification.like(searchSmall))
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc())
            .order_by(models.Product.price.desc())
            .all()
        )
    if sort == "price asc":
        productList = (
            db.query(models.Product)
            .join(models.Descrip, models.Product._descriptions)
            .filter(
                (models.Descrip.major_classification.like(searchLarge))
                & (models.Descrip.medium_classification.like(searchSmall))
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc())
            .order_by(models.Product.price)
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
    sort = request.sort

    currentPage = request.requestPage
    perPage = request.maxItemCountByPage

    offset = currentPage * perPage
    limit = offset + perPage
    if searchType == "product":
        if sort == "name desc":
            productList = (
                db.query(models.Product)
                .filter((models.Product.name.like(search)) & (models.Product.price > 0))
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.name.desc())
                .all()
            )
        if sort == "name asc":
            productList = (
                db.query(models.Product)
                .filter((models.Product.name.like(search)) & (models.Product.price > 0))
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.name)
                .all()
            )
        if sort == "price desc":
            productList = (
                db.query(models.Product)
                .filter((models.Product.name.like(search)) & (models.Product.price > 0))
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price.desc())
                .all()
            )
        if sort == "price asc":
            productList = (
                db.query(models.Product)
                .filter((models.Product.name.like(search)) & (models.Product.price > 0))
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price)
                .all()
            )
    elif searchType == "brand":
        search = search.upper()
        if sort == "name desc":
            productList = (
                db.query(models.Product)
                .filter(
                    (models.Product.brand.like(search)) & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.name.desc())
                .all()
            )
        if sort == "name asc":
            productList = (
                db.query(models.Product)
                .filter(
                    (models.Product.brand.like(search)) & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.name)
                .all()
            )
        if sort == "price desc":
            productList = (
                db.query(models.Product)
                .filter(
                    (models.Product.brand.like(search)) & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price.desc())
                .all()
            )
        if sort == "price asc":
            productList = (
                db.query(models.Product)
                .filter(
                    (models.Product.brand.like(search)) & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price)
                .all()
            )

    # keyword를 ko_ingredient로 가지는 Product테이블의 row들을 다 가져옴.
    elif searchType == "ingredient":
        if sort == "name desc":
            productList = (
                db.query(models.Product)
                .join(models.Ingredient, models.Product._ingredients)
                .filter(
                    models.Ingredient.ko_ingredient.like(search)
                    & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.name.desc())
                .all()
            )
        if sort == "name asc":
            productList = (
                db.query(models.Product)
                .join(models.Ingredient, models.Product._ingredients)
                .filter(
                    models.Ingredient.ko_ingredient.like(search)
                    & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.name)
                .all()
            )
        if sort == "price desc":
            productList = (
                db.query(models.Product)
                .join(models.Ingredient, models.Product._ingredients)
                .filter(
                    models.Ingredient.ko_ingredient.like(search)
                    & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price.desc())
                .all()
            )
        if sort == "price asc":
            productList = (
                db.query(models.Product)
                .join(models.Ingredient, models.Product._ingredients)
                .filter(
                    models.Ingredient.ko_ingredient.like(search)
                    & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price)
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
    sort = request.sort

    currentPage = request.requestPage
    perPage = request.maxItemCountByPage

    offset = currentPage * perPage
    limit = offset + perPage

    if sort == "name desc":
        productList = (
            db.query(models.Product)
            .join(models.Ingredient, models.Product._ingredients)
            .filter(
                (models.Ingredient.ko_ingredient.in_(includeIngredient))
                & (models.Ingredient.ko_ingredient.not_in(excludeIngredient))
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc(), models.Product.name.desc())
            .all()
        )
    if sort == "name asc":
        productList = (
            db.query(models.Product)
            .join(models.Ingredient, models.Product._ingredients)
            .filter(
                models.Ingredient.ko_ingredient.in_(includeIngredient)
                & models.Ingredient.ko_ingredient.not_in(excludeIngredient)
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc())
            .order_by(models.Product.name)
            .all()
        )
    if sort == "price desc":
        productList = (
            db.query(models.Product)
            .join(models.Ingredient, models.Product._ingredients)
            .filter(
                models.Ingredient.ko_ingredient.in_(includeIngredient)
                & models.Ingredient.ko_ingredient.not_in(excludeIngredient)
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc())
            .order_by(models.Product.price.desc())
            .all()
        )
    if sort == "price asc":
        productList = (
            db.query(models.Product)
            .join(models.Ingredient, models.Product._ingredients)
            .filter(
                models.Ingredient.ko_ingredient.in_(includeIngredient)
                & models.Ingredient.ko_ingredient.not_in(excludeIngredient)
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc())
            .order_by(models.Product.price)
            .all()
        )

    showList = productList[offset:limit]
    listLen = len(productList)
    searchResult = schemas.SearchResult
    searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    searchResult.currentPage = request.requestPage

    searchResult.result = showList
    return searchResult

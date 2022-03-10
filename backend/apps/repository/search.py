import random
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


def get_product_by_category(db: Session, request: schemas.SearchCategory):
    sort = request.sort

    currentPage = request.requestPage
    perPage = request.maxItemCountByPage

    offset = currentPage * perPage
    limit = offset + perPage

    productList = get_productList_category(db, sort, request)

    showList = productList[offset:limit]
    listLen = len(productList)
    searchResult = schemas.SearchResult
    searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    searchResult.currentPage = request.requestPage
    searchResult.result = showList
    return searchResult


def get_product_by_keyword(db: Session, request: schemas.SearchKeyword):
    searchType = request.searchResultType
    sort = request.sort

    currentPage = request.requestPage
    perPage = request.maxItemCountByPage

    offset = currentPage * perPage
    limit = offset + perPage

    productList = get_productList_keyword(db, sort, searchType, request)

    showList = productList[offset:limit]

    listLen = len(productList)
    searchResult = schemas.SearchResult
    searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    searchResult.currentPage = request.requestPage

    searchResult.result = showList
    return searchResult


def get_product_by_ingredient(db: Session, request: schemas.SearchIngredients):
    sort = request.sort

    currentPage = request.requestPage
    perPage = request.maxItemCountByPage

    offset = currentPage * perPage
    limit = offset + perPage

    productList = get_productList_ingredient(db, sort, request)

    showList = productList[offset:limit]
    listLen = len(productList)
    searchResult = schemas.SearchResult
    searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    searchResult.currentPage = request.requestPage

    searchResult.result = showList
    return searchResult


def get_keyword_autocomplete(db: Session, request: schemas.Keyword):
    search_keyword = request.keyword
    search = "%{}%".format(search_keyword)

    search_product_list = (
        db.query(models.Product.name)
        .distinct()
        .filter((models.Product.name.like(search)) & (models.Product.extinction != 0))
        .all()
    )

    search_product_list = [value for value, in search_product_list]
    search_product_list = random.sample(search_product_list, 10)

    search_brand_list = (
        db.query(models.Product.brand)
        .distinct()
        .filter(models.Product.brand.like(search))
        .order_by(models.Product.extinction.desc())[:10]
    )
    search_brand_list = [value for value, in search_brand_list]

    search_ingredient_list = (
        db.query(models.Ingredient.ko_ingredient)
        .distinct()
        .filter(models.Ingredient.ko_ingredient.like(search))[:10]
    )
    search_ingredient_list = [value for value, in search_ingredient_list]

    keywordList = schemas.KeywordAutocompleteList

    keywordList.productList = search_product_list
    keywordList.brandList = search_brand_list
    keywordList.ingredientList = search_ingredient_list

    return keywordList


def get_ingredient_autocomplete(db: Session, request: schemas.Keyword):
    search_keyword = request.keyword
    search = "%{}%".format(search_keyword)

    search_ingredient_list = (
        db.query(models.Ingredient.ko_ingredient)
        .distinct()
        .filter(models.Ingredient.ko_ingredient.like(search))[:10]
    )
    search_ingredient_list = [value for value, in search_ingredient_list]

    ingredientList = schemas.IngredientAutocompleteList
    ingredientList.ingredientList = search_ingredient_list

    return ingredientList


def get_productList_category(db: Session, sort: str, request: schemas.SearchCategory):
    largeCategory = request.largeCategory
    smallCategory = request.smallCategory

    searchLarge = "%{}%".format(largeCategory)
    searchSmall = "%{}%".format(smallCategory)

    if sort == "id desc":
        productList = (
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
            .filter(
                (models.Descrip.major_classification.like(searchLarge))
                & (models.Descrip.medium_classification.like(searchSmall))
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc())
            .order_by(models.Product.product_num.desc())
            .all()
        )
    if sort == "id asc":
        productList = (
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
            .filter(
                (models.Descrip.major_classification.like(searchLarge))
                & (models.Descrip.medium_classification.like(searchSmall))
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc())
            .order_by(models.Product.product_num)
            .all()
        )

    if sort == "name desc":
        productList = (
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
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
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
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
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
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
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
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

    return productList


def get_productList_keyword(
    db: Session, sort: str, searchType: str, request: schemas.SearchKeyword
):
    search_keyword = request.keyword
    search = "%{}%".format(search_keyword)
    if searchType == "product":
        if sort == "id desc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter((models.Product.name.like(search)) & (models.Product.price > 0))
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.product_num.desc())
                .all()
            )
        if sort == "id asc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter((models.Product.name.like(search)) & (models.Product.price > 0))
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.product_num)
                .all()
            )
        if sort == "name desc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter((models.Product.name.like(search)) & (models.Product.price > 0))
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.name.desc())
                .all()
            )
        if sort == "name asc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter((models.Product.name.like(search)) & (models.Product.price > 0))
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.name)
                .all()
            )
        if sort == "price desc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter((models.Product.name.like(search)) & (models.Product.price > 0))
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price.desc())
                .all()
            )
        if sort == "price asc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter((models.Product.name.like(search)) & (models.Product.price > 0))
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price)
                .all()
            )
    elif searchType == "brand":
        search = search.upper()
        if sort == "id desc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter(
                    (models.Product.brand.like(search)) & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.product_num.desc())
                .all()
            )
        if sort == "id asc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter(
                    (models.Product.brand.like(search)) & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.product_num)
                .all()
            )

        if sort == "name desc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter(
                    (models.Product.brand.like(search)) & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.name.desc())
                .all()
            )
        if sort == "name asc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter(
                    (models.Product.brand.like(search)) & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.name)
                .all()
            )
        if sort == "price desc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter(
                    (models.Product.brand.like(search)) & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price.desc())
                .all()
            )
        if sort == "price asc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .filter(
                    (models.Product.brand.like(search)) & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price)
                .all()
            )

    # keyword를 ko_ingredient로 가지는 Product테이블의 row들을 다 가져옴.
    elif searchType == "ingredient":
        if sort == "id desc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .join(models.Ingredient, models.Product._ingredients)
                .filter(
                    models.Ingredient.ko_ingredient.like(search)
                    & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.product_num.desc())
                .all()
            )
        if sort == "id asc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .join(models.Ingredient, models.Product._ingredients)
                .filter(
                    models.Ingredient.ko_ingredient.like(search)
                    & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.product_num)
                .all()
            )
        if sort == "name desc":
            productList = (
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
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
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
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
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
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
                db.query(
                    models.Product.product_num,
                    models.Product.name,
                    models.Product.img_url,
                    models.Product.brand,
                    models.Product.average_rating,
                    models.Product.capacity,
                    models.Product.price,
                    models.Product.extinction,
                    models.Product.keywords,
                    models.Descrip.hashtag,
                )
                .join(models.Descrip, models.Product._descriptions)
                .join(models.Ingredient, models.Product._ingredients)
                .filter(
                    models.Ingredient.ko_ingredient.like(search)
                    & (models.Product.price > 0)
                )
                .order_by(models.Product.extinction.desc())
                .order_by(models.Product.price)
                .all()
            )
    return productList


def get_productList_ingredient(
    db: Session, sort: str, request: schemas.SearchIngredients
):
    includeIngredient = request.includeIngredient
    excludeIngredient = request.excludeIngredient
    if sort == "id desc":
        productList = (
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
            .join(models.Ingredient, models.Product._ingredients)
            .filter(
                (models.Ingredient.ko_ingredient.in_(includeIngredient))
                & (models.Ingredient.ko_ingredient.not_in(excludeIngredient))
                & (models.Product.price > 0)
            )
            .order_by(
                models.Product.extinction.desc(), models.Product.product_num.desc()
            )
            .all()
        )
    if sort == "id asc":
        productList = (
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
            .join(models.Ingredient, models.Product._ingredients)
            .filter(
                (models.Ingredient.ko_ingredient.in_(includeIngredient))
                & (models.Ingredient.ko_ingredient.not_in(excludeIngredient))
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc(), models.Product.product_num)
            .all()
        )
    if sort == "name desc":
        productList = (
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
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
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
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
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
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
            db.query(
                models.Product.product_num,
                models.Product.name,
                models.Product.img_url,
                models.Product.brand,
                models.Product.average_rating,
                models.Product.capacity,
                models.Product.price,
                models.Product.extinction,
                models.Product.keywords,
                models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
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
    return productList

import random
from typing import List

from fastapi import HTTPException, Request, Response, status
from sqlalchemy import and_, distinct, func, or_
from sqlalchemy.orm import Session
from sqlalchemy.sql import text

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
    # searchResult = schemas.SearchResult
    # searchResult.totalPageCount = int(listLen / request.maxItemCountByPage)
    # searchResult.currentPage = request.requestPage
    # searchResult.result = showList
    return {
        "totalPageCount": int(listLen / request.maxItemCountByPage),
        "currentPage": request.requestPage,
        "result": showList,
    }


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
    if len(search_product_list) >= 10:
        search_product_list = random.sample(search_product_list, 10)
    else:
        pass

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


def get_sort_string(sort: str):
    if sort == "id desc":
        sortSentence = f"product_product_num desc"  # noqa
    elif sort == "id asc":
        sortSentence = f"product_product_num asc"  # noqa
    elif sort == "price desc":
        sortSentence = f"product_price desc"  # noqa
    elif sort == "price asc":
        sortSentence = f"product_price asc"  # noqa
    elif sort == "name desc":
        sortSentence = f"product_name desc"  # noqa
    elif sort == "name asc":
        sortSentence = f"product_name asc"  # noqa
    return sortSentence


def get_sort_string_ingredient(sort: str):
    if sort == "id desc":
        sortSentence = f"product_num desc"  # noqa
    elif sort == "id asc":
        sortSentence = f"product_num asc"  # noqa
    elif sort == "price desc":
        sortSentence = f"price desc"  # noqa
    elif sort == "price asc":
        sortSentence = f"price asc"  # noqa
    elif sort == "name desc":
        sortSentence = f"`name` desc"  # noqa
    elif sort == "name asc":
        sortSentence = f"`name` asc"  # noqa
    return sortSentence


def get_productList_category(db: Session, sort: str, request: schemas.SearchCategory):
    largeCategory = request.largeCategory
    smallCategory = request.smallCategory

    searchLarge = "%{}%".format(largeCategory)
    searchSmall = "%{}%".format(smallCategory)

    sortSentence = get_sort_string(sort)

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
            func.ifnull(models.Product.keywords, models.Descrip.hashtag).label(
                "hashtag"
            )
            # models.Product.keywords,
            # models.Descrip.hashtag,
        )
        .join(models.Descrip, models.Product._descriptions)
        .filter(
            (models.Descrip.major_classification.like(searchLarge))
            & (models.Descrip.medium_classification.like(searchSmall))
            & (models.Product.price > 0)
        )
        .order_by(models.Product.extinction.desc())
        .order_by(text(sortSentence))
        .all()
    )
    return productList


def get_productList_keyword(
    db: Session, sort: str, searchType: str, request: schemas.SearchKeyword
):
    search_keyword = request.keyword
    search = "%{}%".format(search_keyword)

    if searchType == "product":
        sortSentence = get_sort_string(sort)
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
                func.ifnull(models.Product.keywords, models.Descrip.hashtag).label(
                    "hashtag"
                )
                # models.Product.keywords,
                # models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
            .filter((models.Product.name.like(search)) & (models.Product.price > 0))
            .order_by(models.Product.extinction.desc())
            .order_by(text(sortSentence))
            .all()
        )
    elif searchType == "brand":
        sortSentence = get_sort_string(sort)
        search = search.upper()
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
                func.ifnull(models.Product.keywords, models.Descrip.hashtag).label(
                    "hashtag"
                )
                # models.Product.keywords,
                # models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
            .filter((models.Product.brand.like(search)) & (models.Product.price > 0))
            .order_by(models.Product.extinction.desc())
            .order_by(text(sortSentence))
            .all()
        )

    elif searchType == "ingredient":
        sortSentence = get_sort_string(sort)
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
                func.ifnull(models.Product.keywords, models.Descrip.hashtag).label(
                    "hashtag"
                )
                # models.Product.keywords,
                # models.Descrip.hashtag,
            )
            .join(models.Descrip, models.Product._descriptions)
            .join(models.Ingredient, models.Product._ingredients)
            .filter(
                models.Ingredient.ko_ingredient.like(search)
                & (models.Product.price > 0)
            )
            .order_by(models.Product.extinction.desc())
            .order_by(text(sortSentence))
            .all()
        )
    return productList


def get_list_to_string_queryIn(lstStr: List):
    retrnStr = ""
    for s in lstStr:
        retrnStr += f'"{s}",'

    return retrnStr[0:-1]


def get_productList_ingredient(
    db: Session, sort: str, request: schemas.SearchIngredients
):
    lenInclude = len(request.includeIngredient)
    lenExClude = len(request.excludeIngredient)
    includeIngredient = get_list_to_string_queryIn(request.includeIngredient)
    excludeIngredient = get_list_to_string_queryIn(request.excludeIngredient)

    sortSentence = get_sort_string_ingredient(sort)

    queryString = (
        "SELECT "
        + f"pd.product_num, "  # noqa
        + f"pd.name, "  # noqa
        + f"pd.img_url, "  # noqa
        + f"pd.brand, "  # noqa
        + f"pd.average_rating, "  # noqa
        + f"pd.capacity, "  # noqa
        + f"pd.price, "  # noqa
        + f"pd.extinction, "  # noqa
        + f"ifnull(pd.keywords, dp.hashtag) as hashtag "  # noqa
        + f"FROM product pd "  # noqa
        + f"JOIN descrip dp ON pd.product_num = dp.fk_product_descrip_product_num "  # noqa
        + f"JOIN ( "  # noqa
        + f"SELECT a.product_id from productingredientrelation a "  # noqa
        + f"JOIN ingredient b ON a.ingredient_id = b.id "  # noqa
        + f"WHERE "  # noqa
        + f"a.product_id NOT IN ( "  # noqa
        + f"SELECT DISTINCT product_id FROM productingredientrelation a "  # noqa
        + f"JOIN ingredient b ON a.ingredient_id = b.id "  # noqa
        + (
            f"WHERE b.ko_ingredient IN ({excludeIngredient})) "  # noqa
            if lenExClude != 0  # noqa
            else 'WHERE b.ko_ingredient IN (""))'  # noqa
        )
        + (
            f"AND b.ko_ingredient IN ({includeIngredient}) " if lenInclude != 0 else ""
        )  # noqa
        + f"GROUP BY a.product_id "  # noqa
        + (f"HAVING count(*) = {lenInclude}" if lenInclude != 0 else "")  # noqa
        + f") sub ON pd.product_num = sub.product_id "  # noqa
        + f"WHERE pd.price > 0 "  # noqa
        + f"ORDER BY pd.extinction DESC, {sortSentence}"  # noqa
    )
    productList = [dict(x) for x in db.execute(queryString).fetchall()]
    return productList

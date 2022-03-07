from typing import List, Optional

from fastapi import Depends
from pydantic import BaseModel


class ProductList(BaseModel):
    product_num: int
    name: str
    img_url: str
    brand: str
    average_rating: float
    capacity: str
    price: int

    class Config:
        orm_mode = True


class ProductIdList(BaseModel):
    product_id: List[int]


class IngredientIdList(BaseModel):
    ingredient_id: int


class SearchResult(BaseModel):
    totalPageCount: int
    currentPage: int
    result: List[ProductList]

    class Config:
        orm_mode = True


class ProductNameList(BaseModel):
    name: str

    class Config:
        orm_mode = True


class ProductBrandList(BaseModel):
    brand: str

    class Config:
        orm_mode = True


class KoIngredientList(BaseModel):
    ko_ingredient: str

    class Config:
        orm_mode = True


class Keyword(BaseModel):
    keyword: str


class KeywordAutocompleteList(BaseModel):
    productList: List[str]
    brandList: List[str]
    ingredientList: List[str]

    class Config:
        orm_mode = True


class IngredientAutocompleteList(BaseModel):
    ingredientList: List[str]

    class Config:
        orm_mode = True


class SearchResultKeyword(BaseModel):
    totalPageCount: int
    currentPage: int
    result: List[ProductList]
    productList: List[str]
    brandList: List[str]
    ingredientList: List[str]

    class Config:
        orm_mode = True


class SearchResultIngredient(BaseModel):
    totalPageCount: int
    currentPage: int
    result: List[ProductList]
    ingredientList: List[KoIngredientList]

    class Config:
        orm_mode = True


class SearchKeyword(BaseModel):
    keyword: str
    searchResultType: str
    requestPage: int
    maxItemCountByPage: int
    sort: str


class SearchCategory(BaseModel):
    largeCategory: str
    smallCategory: str
    requestPage: int
    maxItemCountByPage: int
    sort: str


class SearchIngredients(BaseModel):
    includeIngredient: List[str]
    excludeIngredient: List[str]
    requestPage: int
    maxItemCountByPage: int
    sort: str
    # requestPage, maxItemCountByPage,sort가 공통 인자. 상속관계 만들기 가능.


class DetailId(BaseModel):
    id: int


class IngredientList(BaseModel):
    id: int
    ko_ingredient: str
    en_ingredient: str
    use: str
    score: str

    class Config:
        orm_mode = True


class ProductDetail(BaseModel):
    product_num: int
    name: str
    img_url: str
    brand: str
    average_rating: float
    price: str
    description: str
    hashtag: str
    ingredientList: List[IngredientList]

    class Config:
        orm_mode = True


class ProductDescription(BaseModel):
    id: int
    fk_product_descrip_product_num: int
    color_type: str
    description: str
    hashtag: str
    cost: str
    major_classification: str
    medium_classification: str
    minor_classification: str

    class Config:
        orm_mode = True

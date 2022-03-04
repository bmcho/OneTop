from typing import List, Optional

from pydantic import BaseModel


class ProductList(BaseModel):
    product_num: int
    name: str
    img_url: str
    brand: str
    average_rating: float
    price: str

    class Config:
        orm_mode = True


class SearchResult(BaseModel):
    totalPageCount: int
    currentPage: int
    result: List[ProductList]

    class Config:
        orm_mode = True


class SearchKeyword(BaseModel):
    keyword: str
    searchResultType: str
    requestPage: int
    maxItemCountByPage: int


class SearchCategory(BaseModel):
    largeCategory: str
    smallCategory: str
    requestPage: int
    maxItemCountByPage: int


class SearchIngredients(BaseModel):
    includeIngredient: List[str] = []
    excludeIngredient: List[str] = []
    requestPage: int
    maxItemCountByPage: int


class DetailId(BaseModel):
    id: int


class IngredientList(BaseModel):
    id: int
    ko_engredient: str
    en_engredient: str
    user: str
    score: str


class ProductIdList(BaseModel):
    product_id: List[int]


class ProductDetail(BaseModel):
    product_num: int
    name: str
    img_url: str
    brand: str
    average_rating: float
    price: str
    description: str
    hashtag: str

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

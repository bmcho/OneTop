from typing import List, Optional

from pydantic import BaseModel


class ProductList(BaseModel):
    product_num: int
    name: str
    img_url: str
    brand: str
    average_rating: float
    price: str
    # extinction:int

    # totalPageCount: int
    # currnetPage: int

    class Config:
        orm_mode = True


class SearchResult(BaseModel):
    totalPageCount: int
    currentPage: int
    result: List[ProductList] = []


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

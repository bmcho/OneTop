from typing import List, Optional

from pydantic import BaseModel


class ProductList(BaseModel):
    id: int
    name: str
    img: str
    brand: str
    rating: str
    price: str
    ingredients: str

    # totalPageCount: int
    # currnetPage: int

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


class SearchResult(BaseModel):
    totalPageCount: int
    currentPage: int
    result: List[ProductList] = []

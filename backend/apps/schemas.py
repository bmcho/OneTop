from datetime import datetime
from typing import List, Optional

from fastapi import Depends
from pydantic import BaseModel

"""
create_date, modify_data
"""


class BaseClass(BaseModel):
    create_data: datetime
    modify_data: Optional[datetime] = None


class Message(BaseModel):
    message: str


class Product(BaseModel):
    product_num: int
    name: str
    img_url: str
    brand: str
    average_rating: float
    capacity: str
    price: int
    keywords: Optional[str] = ""

    class Config:
        orm_mode = True


class ProductList(Product):
    hashtag: Optional[str] = ""

    class Config:
        orm_mode = True


class SearchResult(BaseModel):
    totalPageCount: int
    currentPage: int
    result: List[ProductList]

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
    includeIngredient: List[Optional[str]] = None
    excludeIngredient: List[Optional[str]] = None
    requestPage: int
    maxItemCountByPage: int
    sort: str
    # requestPage, maxItemCountByPage,sort가 공통 인자. 상속관계 만들기 가능.


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
    price: int
    capacity: str
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


"""
review schema
"""

"""
base
"""


class ReviewBase(BaseModel):
    id: Optional[int] = None
    fk_product_num: int


"""
create, modify, delete
"""


class ReviewManipulation(ReviewBase):
    password: str
    comment: str = None
    images: List[Optional[str]] = None

    class Config:
        orm_mode = True


class ReviewDelete(ReviewBase):
    password: str

    class Config:
        orm_mode = True


"""
search
"""


class ReviewSearchImage(BaseModel):
    img_path: Optional[str] = None

    class Config:
        orm_mode = True


class ReviewSearch(ReviewBase):
    comment: str
    review_images: List[Optional[ReviewSearchImage]] = None
    create_date: datetime
    modify_data: Optional[datetime] = None

    class Config:
        orm_mode = True


class ReviewReturn(BaseModel):
    data: List[Optional[ReviewSearch]] = None
    total_page: int
    current_page: int


"""
recommand schema
"""


class KeywordList(BaseModel):
    keyword: List[str]


class KeywordCategoryList(BaseModel):
    category: str
    keywords: List[str]

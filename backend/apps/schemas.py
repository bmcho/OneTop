from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

"""
create_date, modify_data
"""


class BaseClass(BaseModel):
    create_data: datetime
    modify_data: Optional[datetime] = None


class Message(BaseModel):
    message: str


class ProductList(BaseModel):
    product_num: int
    name: str
    img_url: str
    brand: str
    average_rating: float
    price: str

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
    includeIngredient: List[str]
    excludeIngredient: List[str]
    requestPage: int
    maxItemCountByPage: int


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
    comment: Optional[str] = None
    img_url: Optional[str] = None

    class Config:
        orm_mode = True


class ReviewDelete(ReviewBase):
    password: str

    class Config:
        orm_mode = True


"""
search
"""


class ReviewSearch(ReviewBase):
    comment: str
    img: Optional[str] = None
    create_date: datetime
    modify_data: Optional[datetime] = None

    class Config:
        orm_mode = True


class ReviewReturn(BaseModel):
    data: List[ReviewSearch]
    total_page: int
    current_page: int

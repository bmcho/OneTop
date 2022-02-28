from typing import List, Optional
from pydantic import BaseModel

'''
성분
'''
class IngredientBase(BaseModel):
  ko_ingredient: Optional[str] = None
  en_ingredient: Optional[str] = None

class Ingredient(IngredientBase):
  id: int
  
  class Config:
    orm_mode = True


'''
화장품 상세
'''
class DescripBase(BaseModel):
  color_type: str
  cost: int
  category: str
  product_category_large: str 
  product_category_middle: str
  product_category_small: str

class Descrip(DescripBase):
  id:int
  product_num: id

  class Config:
    orm_mode = True

'''
화장품정보
'''
class ProductsBase(BaseModel):
  name: str
  img_url: Optional[str] = None
  brand: str
  average_rating: Optional[float] = 0
  price: Optional[float] = "N/A"
  extinction: Optional[bool] = False

class ProductList(BaseModel):
  product_num: int
  
  class Config:
    orm_mode = True

class Products(ProductsBase):
  product_num: int

  descriptions: Descrip
  ingredients: Optional[List[Ingredient]] = None

  class Config:
    orm_mode = True


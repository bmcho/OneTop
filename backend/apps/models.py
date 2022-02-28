from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Numeric, TEXT
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

from database import Base

'''
화장품 정보
'''
class Product(Base) :
  __tablename__ = "product"

  product_num = Column(Integer, primary_key=True, index=True)
  name = Column(String(100), nullable=False)
  img_url = Column(String(500), nullable=False)
  brand = Column(String(50), nullable=False)
  average_rating = Column(Numeric)
  price = Column(String(100))
  extinction = Column(Boolean, default=True)

  descriptions = relationship("Descrip", back_populates="Descrip")
  ingredients = relationship("Ingredient", 
                  secondary="ProductIngredientRelation",
                  back_populates="Ingredient"
                )

'''
화장품 상세
'''
class Descrip(Base) :
  __tablename__ = "descrip"

  id = Column(Integer, primary_key=True, index=True)
  product_num = Column(Integer, ForeignKey('product.product_num'), index=True)
  color_type = Column(String(100), nullable=False)
  cost = Column(Integer, nullable=False)
  category = Column(String(100), nullable=False)
  product_category_large = Column(String(100))
  product_category_middle = Column(String(100))
  product_category_small = Column(String(100))

'''
성분
'''
class Ingredient(Base) :
  __tablename__ = "ingredient"

  id = Column(Integer, primary_key=True, index=True)
  ko_ingredient = Column(TEXT)
  en_ingredient = Column(TEXT)
  
  products = relationship("product", 
                  secondary="ProductIngredientRelation",
                  back_populates="product"
                )
  
'''
화장품, 성분 관계 테이블
'''
class ProductIngredientRelation(Base) :
  __tablename__ = 'productingredientrelation'

  id = Column(Integer, primary_key=True, index=True)
  product_num = Column(Integer, ForeignKey('product.product_num'), index=True)
  ingredient_id = Column(Integer, ForeignKey('ingredient.id'), index=True)
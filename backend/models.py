from sqlalchemy import (
    TEXT,
    Boolean,
    Column,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Table,
)
from sqlalchemy.orm import relationship,backref

from database import Base

"""
화장품 정보
"""


class Product(Base):
    __tablename__ = "product"

    product_num = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    img_url = Column(String(500), nullable=False)
    brand = Column(String(50), nullable=False)
    average_rating = Column(Numeric)
    price = Column(String(100))
    extinction = Column(Boolean, default=True)

    descriptions = relationship("Descrip", back_populates="product")
    ingredients = relationship(
        "Ingredient", secondary="ProductIngredientRelation"
    )


"""
화장품 상세
"""


class Descrip(Base):
    __tablename__ = "descrip"

    id = Column(Integer, primary_key=True, index=True)
    fk_product_descrip_product_num = Column(Integer, ForeignKey("product.product_num"), index=True)
    color_type = Column(TEXT)
    description = Column(TEXT)
    hashtag = Column(TEXT)
    cost = Column(String(100))
    major_classification = Column(String(100))
    medium_classification = Column(String(100))
    minor_classification = Column(String(100))

    products = relationship("Product", back_populates="descrip")


"""
성분
"""


class Ingredient(Base):
    __tablename__ = "ingredient"

    id = Column(Integer, primary_key=True, index=True)
    ko_ingredient = Column(TEXT)
    en_ingredient = Column(TEXT)
    use = Column(TEXT)
    score = Column(String(10))

    products = relationship(
        "Product", secondary="productingredientrelation"
    )


"""
화장품, 성분 관계 테이블
"""


class ProductIngredientRelation(Base):
    __tablename__ = "productingredientrelation"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("product.product_num"))
    ingredient_id = Column(Integer, ForeignKey("ingredient.id"))

    products=relationship("Product",backref=backref("productingredientrelation"))
    ingredients=relationship("Ingredient",backref=backref("productingredientrelation"))

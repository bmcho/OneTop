import datetime
from typing import Counter

from sqlalchemy import (
    DATETIME,
    TEXT,
    Boolean,
    Column,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Table,
)
from sqlalchemy.orm import backref, relationship

from database import Base

"""
화장품 정보
"""


productingredientrelation = Table(
    "productingredientrelation",
    Base.metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("product_id", Integer, ForeignKey("product.product_num")),
    Column("ingredient_id", Integer, ForeignKey("ingredient.id")),
)


class Product(Base):
    __tablename__ = "product"

    product_num = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    img_url = Column(String(500), nullable=False)
    brand = Column(String(50), nullable=False)
    average_rating = Column(Numeric(10, 2))
    capacity = Column(String(50))
    price = Column(Integer)
    extinction = Column(Boolean, default=True)
    keywords = Column(String(100), nullable=True)

    _descriptions = relationship("Descrip", back_populates="_products")
    _ingredients = relationship(
        "Ingredient", secondary="productingredientrelation", back_populates="_products"
    )


"""
화장품 상세
"""


class Descrip(Base):
    __tablename__ = "descrip"

    id = Column(Integer, primary_key=True, index=True)
    fk_product_descrip_product_num = Column(
        Integer, ForeignKey("product.product_num"), index=True
    )
    color_type = Column(TEXT)
    description = Column(TEXT)
    hashtag = Column(TEXT)
    cost = Column(String(100))
    major_classification = Column(String(100))
    medium_classification = Column(String(100))
    minor_classification = Column(String(100))

    _products = relationship("Product", back_populates="_descriptions", uselist=False)


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

    _products = relationship(
        "Product", secondary="productingredientrelation", back_populates="_ingredients"
    )


"""
화장품, 성분 관계 테이블
"""


# class ProductIngredientRelation(Base):
#     __tablename__ = "productingredientrelation"

#     id = Column(Integer, primary_key=True)
#     product_id = Column(Integer, ForeignKey("product.product_num"))
#     ingredient_id = Column(Integer, ForeignKey("ingredient.id"))

#     _products = relationship("Product", backref=backref("productingredientrelation"))
#     _ingredients = relationship(
#         "Ingredient", backref=backref("productingredientrelation")
#     )

"""
화장품 리뷰(익명성)
"""


class Review(Base):
    __tablename__ = "review"

    id = Column(Integer, primary_key=True, index=True)
    fk_product_num = Column(Integer, ForeignKey("product.product_num"), index=True)
    hashed_password = Column(String(200))
    comment = Column(TEXT, nullable=False)
    hash_tag = Column(TEXT, nullable=True)
    create_date = Column(DATETIME, nullable=False, default=datetime.datetime.now)
    modify_date = Column(DATETIME, nullable=True)
    use_flag = Column(Boolean, default=True)

    review_images = relationship("ReviewImage", backref="review", cascade="all,delete")


class ReviewImage(Base):
    __tablename__ = "review_image"

    id = Column(Integer, primary_key=True, index=True)
    fk_review_id = Column(Integer, ForeignKey("review.id"), index=True)
    img_path = Column(String(200))

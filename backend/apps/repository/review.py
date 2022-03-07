import datetime
import math
from typing import List

from fastapi import HTTPException, Request, status
from sqlalchemy.orm import Session

from models import Product, Review

from ..core import hashing_password
from ..schemas import ReviewDelete, ReviewManipulation, ReviewSearch

"""
search 
"""


def get_reviews(product_num: int, page: int, db: Session):
    # 리뷰도 한페이지당 20개씩
    review_count = db.query(Review).filter(Review.fk_product_num == product_num).count()
    totalPage = math.ceil(review_count / 20)
    currentPage = page
    offset = (currentPage - 1) * 20

    return_value = (
        db.query(Review)
        .filter(Review.fk_product_num == product_num)
        .limit(20)
        .offset(offset)
        .all()
    )
    return {"data": return_value, "total_page": totalPage, "current_page": currentPage}


"""
create
"""


def post_reviews_create(request: ReviewManipulation, db: Session):
    # password hashing
    hashed_password = hashing_password.get_password_hash(request.password)
    saveData = Review(
        fk_product_num=request.fk_product_num,
        hashed_password=hashed_password,
        comment=request.comment,
        img=request.img_url,
    )
    db.add(saveData)
    db.commit()
    # newID = saveData.id
    return_review = db.query(Review).filter(Review.id == saveData.id).first()
    return return_review


"""
modify
"""


def post_reviews_modify(request: ReviewManipulation, db: Session):
    # check password hashing
    data = db.query(Review).filter(Review.id == request.id).first()

    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="review, not found",
        )

    if not hashing_password.verify_password(request.password, data.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Password does not match",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        # newID = saveData.id
        return_review = db.query(Review).filter(Review.id == request.id).first()

        return_review.comment = request.comment
        return_review.img = request.img_url

        db.commit()
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error, In running the Database",
        )

    return return_review


"""
delete
"""


def post_reviews_delete(request: ReviewDelete, db: Session):
    data = db.query(Review).filter(Review.id == request.id).first()

    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="review, not found",
        )

    try:
        db.delete(data)
        db.commit()
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error, In running the Database",
        )

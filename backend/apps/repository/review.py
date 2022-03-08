import datetime
import math
from typing import List

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from models import Review, ReviewImage

from ..core import hashing_password, utill
from ..schemas import ReviewDelete, ReviewManipulation

"""
search 
"""


def get_reviews(product_num: int, page: int, db: Session):
    # 리뷰도 한페이지당 20개씩
    review_count = (
        db.query(Review)
        .filter(Review.fk_product_num == product_num, Review.use_flag == 1)
        .count()
    )
    totalPage = math.ceil(review_count / 20)
    currentPage = page
    offset = (currentPage - 1) * 20
    return_review = (
        db.query(Review)
        .filter(Review.fk_product_num == product_num)
        .limit(20)
        .offset(offset)
        .all()
    )
    for review in return_review:
        for review_image in review.review_images:
            review_image.img_path = utill.encoding_base64(review_image.img_path)

    return {"data": return_review, "total_page": totalPage, "current_page": currentPage}


"""
create
"""


def post_reviews_create(request: ReviewManipulation, db: Session):
    # password hashing
    hashed_password = hashing_password.get_password_hash(request.password)

    try:
        reveiw_data = Review(
            fk_product_num=request.fk_product_num,
            hashed_password=hashed_password,
            comment=request.comment,
        )
        image_list = []
        for image in request.images:
            review_image = ReviewImage(img_path=utill.IMAGE_DIR + "/" + image)
            image_list.append(review_image)
            db.add(review_image)

        reveiw_data.review_images = image_list
        db.add(reveiw_data)
        db.commit()
    except Exception as ex:
        print(ex)

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error, In running the Database",
        )

    return_review = db.query(Review).filter(Review.id == reveiw_data.id).first()
    for review_image in return_review.review_images:
        review_image.img_path = utill.encoding_base64(review_image.img_path)

    return return_review


def post_image_upload(files: List[UploadFile]):

    try:
        for file in files:
            with open(utill.IMAGE_DIR + "/" + file.filename, "wb") as file_object:
                file_object.write(file.file.read())
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error, uploading image",
        )


"""
modify
"""


def post_reviews_modify(request: ReviewManipulation, db: Session):

    return_review = (
        db.query(Review)
        .filter(
            Review.id == request.id, Review.fk_product_num == request.fk_product_num
        )
        .first()
    )

    if return_review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="review, not found",
        )

    # check password hashing
    if not hashing_password.verify_password(
        request.password, return_review.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Password does not match",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        # 변경 된 사진이 있다면 images list에 값을 넣는걸로
        # 변경 된 값이 있다면 기존 데이터들을 삭제 이후 insert
        if len(return_review.review_images) != 0:
            delete_images = db.query(ReviewImage).filter(
                ReviewImage.fk_review_id == return_review.id
            )

            db.delete(delete_images)

        image_list = []
        for image in request.images:
            review_image = ReviewImage(img_path=utill.IMAGE_DIR + "/" + image)
            image_list.append(review_image)
            db.add(review_image)

        # 리뷰내용 변경
        return_review.comment = request.comment
        return_review.review_images = image_list

        db.commit()
    except Exception as ex:
        print(ex)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error, In running the Database",
        )

    return return_review


"""
delete
"""


def post_reviews_delete(request: ReviewDelete, db: Session):
    delete_review = db.query(Review).filter(Review.id == request.id).first()
    print(delete_review)
    if delete_review is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="review, not found",
        )

    try:
        delete_review.use_flag = False
        db.commit()
    except Exception as ex:
        print(ex)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error, In running the Database",
        )

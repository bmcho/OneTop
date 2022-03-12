import datetime
import math
from typing import List

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from models import Review, ReviewImage

from ..core import hashing_password, util
from ..schemas import ReviewDelete, ReviewManipulation


def validation_review_data(review_data: Review, request: ReviewDelete):
    if review_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="review, not found",
        )

    # check password hashing
    if not hashing_password.verify_password(
        request.password, review_data.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Password does not match",
            headers={"WWW-Authenticate": "Bearer"},
        )


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
        .filter(Review.fk_product_num == product_num, Review.use_flag == 1)
        .limit(20)
        .offset(offset)
        .all()
    )
    # for review in return_review:
    #     for review_image in review.review_images:
    #         review_image.img_path = util.encoding_base64(review_image.img_path)

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
            hashtag=request.hashtag,
        )
        image_list = []
        for image in request.images:
            # base64 encoding string을 그대로 저장하는 방식으로 변경
            # review_image = ReviewImage(img_path="".join([util.IMAGE_DIR, "/", image]))
            review_image = ReviewImage(img_path=image)
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
        review_image.img_path = util.encoding_base64(review_image.img_path)

    return return_review


# 사용 X
def post_image_upload(files: List[UploadFile]):

    try:
        for file in files:
            with open(
                "".join([util.IMAGE_DIR, "/", file.filename]), "wb"
            ) as file_object:
                file_object.write(file.file.read())
    except Exception as ex:
        print(ex)
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
            Review.id == request.id,
            Review.fk_product_num == request.fk_product_num,
            Review.use_flag == 1,
        )
        .first()
    )

    validation_review_data(return_review, request)

    try:
        # 기존 review_image 삭제
        db.query(ReviewImage).filter(ReviewImage.fk_review_id == request.id).delete()
        image_list = []
        for image in request.images:
            # base64 encoding string을 그대로 저장하는 방식으로 변경
            # review_image = ReviewImage(img_path="".join([util.IMAGE_DIR, "/", image]))
            review_image = ReviewImage(img_path=image)
            image_list.append(review_image)
            db.add(review_image)

        # 리뷰내용 변경
        return_review.comment = request.comment
        return_review.hashtag = request.hashtag
        return_review.modify_date = datetime.datetime.now()
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

    validation_review_data(delete_review, request)

    try:
        delete_review.use_flag = False
        db.commit()
    except Exception as ex:
        print(ex)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error, In running the Database",
        )

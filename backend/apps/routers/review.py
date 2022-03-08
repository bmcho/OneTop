from typing import List, Optional

from fastapi import APIRouter, Body, Depends, File, Response, UploadFile
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database import get_db

from ..repository.review import *
from ..schemas import (
    Message,
    ReviewDelete,
    ReviewManipulation,
    ReviewReturn,
    ReviewSearch,
)

router = APIRouter(
    prefix="/reviews",
    tags=["reviews"],
)

"""
review search - get
"""


@router.get("/{product_num}", response_model=ReviewReturn)
def get_review(
    product_num: int, page: Optional[int] = 1, db: Session = Depends(get_db)
):
    return get_reviews(product_num, page, db)


"""
review create,modify - post
"""


@router.post("/", response_model=ReviewSearch)
def post_review(
    review_data: ReviewManipulation,
    response: Response,
    action: str = Body(None, regex="create|modify"),
    db: Session = Depends(get_db),
):
    if action == "create":
        response.status_code = status.HTTP_201_CREATED
        return post_reviews_create(review_data, db)
    else:
        response.status_code = status.HTTP_202_ACCEPTED
        return post_reviews_modify(review_data, db)


"""
review delete - post
"""


@router.delete("/", responses={202: {"model": Message}})
def delete_review(
    reviw_data: ReviewDelete,
    db: Session = Depends(get_db),
):
    post_reviews_delete(reviw_data, db)
    return JSONResponse(status_code=202, content={"message": "Success, delete review"})


@router.post("/images")
def upload_images(files: List[UploadFile] = File(...)):
    post_image_upload(files)
    return JSONResponse(status_code=202, content={"message": "Success, upload images"})


# @router.get("/image")
# def get_image():
#     UPLOAD_DIRECTORY = "./.static"
#     a = FileResponse(os.path.join(UPLOAD_DIRECTORY, "E5_P8MSVgAIDJHk.jpg"))
#     return a
#     # return {"data": "success", "image": a}
#     # return {"data": "success"}

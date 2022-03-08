# import ast
# from typing import List

# # import numpy as np
# # import pandas as pd
# from fastapi import HTTPException, Request, Response, status

# # from sklearn.metrics.pairwise import cosine_similarity
# from sqlalchemy.orm import Session

# import models as models

# from .. import schemas


# def call_keywords(category: str):
#     # 선택 목록에서 제거할 시 if 문 제거
#     if category in ["이너뷰티", "생활용품", "베이비", "디바이스"]:
#         return False  # 선택 시 다른 문구출력(예, 상품이 부족하여 추천할 수 없습니다.)

#     # db 에서 category_keywords읽기
#     category_keywords = pd.read_csv("./new_db/category_keywords.csv")

#     # category가 같은 값
#     category_keywords = category_keywords[category_keywords.category == category]

#     # 정렬
#     category_keywords = category_keywords.sort_values("count", ascending=False)

#     # count > 5 이상인 값
#     keywords = list(category_keywords[category_keywords["count"] > 5].keyword)

#     # 리스트로 반환
#     return keywords


# def keywords_similarity(request: schemas.KeywordCategoryList, db: Session):
#     # master_embedding 을 db에서 읽어 데이터 프레임으로 만들기
#     master_embedding = pd.read_csv("./new_db/master_embedding.csv")

#     master_embedding.embedding = master_embedding.embedding.apply(
#         lambda x: ast.literal_eval(x)
#     )
#     master_embedding.embedding = master_embedding["embedding"].apply(
#         lambda x: np.array(x)
#     )
#     embedding_dict = dict(
#         zip(master_embedding["keyword"], master_embedding["embedding"])
#     )

#     # product_embedding 을 db에서 읽어 데이터 프레임으로 만들기
#     product_embedding = pd.read_csv("./new_db/product_embedding.csv")
#     product_embedding = product_embedding[
#         product_embedding.category == request.category
#     ]
#     product_embedding.embedding = product_embedding.embedding.apply(
#         lambda x: ast.literal_eval(x)
#     )
#     product_embedding.embedding = product_embedding["embedding"].apply(
#         lambda x: np.array(x)
#     )

#     # 단종 상품 제외 !!
#     product_embedding = product_embedding[product_embedding.Discontinued == False]

#     # 선택한 키워드 벡터 계산
#     vector = np.zeros((100,))
#     for keyword in request.keywords:
#         vector += embedding_dict[keyword]

#     # 유사도 비교를 위한 매트릭스 생성
#     arr = np.array([vector])
#     matrix = np.append(arr, np.array(list(product_embedding.embedding)), axis=0)

#     # 코사인 유사도 비교 및 상품 아이디 생성
#     cos_df = pd.DataFrame(
#         cosine_similarity(matrix[:1], matrix)[0], columns=["similarity"]
#     )
#     cos_df["product_num"] = [0] + list(product_embedding.product_num)

#     # 가장 가까운 상품 10개 반환
#     product_num_list = list(
#         cos_df.sort_values("similarity", ascending=False)[0:11].product_num
#     )

#     # product_num으로 긁어온 db 객체 저장할 배열.
#     product_list = []

#     # product_num_list에 있는 product_num들과 매핑되는 product들을 product_list에 append해줌.
#     for product_num in product_num_list:
#         product = db.query(models.Product).filter(
#             models.Product.product_num == product_num
#         )
#         product_list.append(product)

#     return product_list

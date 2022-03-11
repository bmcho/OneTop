import styled from 'styled-components';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProductReviewAction } from '../../../stores/modules/productReview';
import { useRouter } from 'next/router';
import Pagenation from '../../search/searchCategory/Pagenation';
import ReviewItem from './ReviewItem';
import LoadingComponent from '../../commons/loading/LoadingComponent';

const ReviewMain = () => {
  const { loading, reviews, error } = useSelector(
    (state) => state.productReview.get
  );
  const { reviews: newReview } = useSelector(
    (state) => state.productReview.post
  );
  const { result: modifyUpdate } = useSelector(
    (state) => state.productReview.modify
  );
  const { result: deleteUpdate } = useSelector(
    (state) => state.productReview.delete
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { page } = router.query;

  useEffect(() => {
    dispatch(getProductReviewAction(id, 1));
  }, [newReview, modifyUpdate, deleteUpdate]);

  useEffect(() => {
    if (page) {
      dispatch(getProductReviewAction(id, page));
    }
  }, [page]);

  if (loading) return <LoadingComponent />;

  return (
    <ReviewMainBlock>
      {reviews?.data?.length ? (
        <>
          <ReviewUl>
            {reviews.data.map((review) => (
              <ReviewItem key={review.id} {...review} />
            ))}
          </ReviewUl>
          <Pagenation
            pathname={`/detail/${id}`}
            itemPerPage={20}
            totalPage={reviews.total_page - 1}
          />
        </>
      ) : (
        <NonReviewBlock>리뷰가 없습니다.</NonReviewBlock>
      )}
    </ReviewMainBlock>
  );
};

const ReviewMainBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ReviewUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NonReviewBlock = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
`;

export default ReviewMain;

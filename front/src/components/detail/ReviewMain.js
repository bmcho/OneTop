import styled from 'styled-components';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProductReviewAction } from '../../stores/modules/productReview';
import { useRouter } from 'next/router';
import ReviewItem from './ReviewItem';

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

  useEffect(() => {
    dispatch(getProductReviewAction(id, 1));
  }, [newReview, modifyUpdate, deleteUpdate]);

  if (loading) return <LoadingBlock>loading...</LoadingBlock>;

  return (
    <ReviewMainBlock>
      {reviews?.data?.length ? (
        <>
          <ReviewUl>
            {reviews.data.map((review) => (
              <ReviewItem key={review.id} {...review} />
            ))}
          </ReviewUl>
        </>
      ) : (
        <div>리뷰가 없습니다.</div>
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
`;

const LoadingBlock = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default ReviewMain;

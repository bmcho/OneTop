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
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getProductReviewAction(id, 1));
  }, [newReview]);

  if (loading) return <div>loading...</div>;

  return (
    <ReviewMainBlock>
      {reviews ? (
        <>
          <Line>
            <ReviewUl>
              {reviews?.data
                .filter((_, idx) => idx % 3 === 0)
                .map((review) => (
                  <ReviewItem key={review.id} {...review} />
                ))}
            </ReviewUl>
          </Line>
          <Line>
            <ReviewUl>
              {reviews?.data
                .filter((_, idx) => idx % 3 === 1)
                .map((review) => (
                  <ReviewItem key={review.id} {...review} />
                ))}
            </ReviewUl>
          </Line>
          <Line>
            <ReviewUl>
              {reviews?.data
                .filter((_, idx) => idx % 3 === 2)
                .map((review) => (
                  <ReviewItem key={review.id} {...review} />
                ))}
            </ReviewUl>
          </Line>
        </>
      ) : (
        <div>0</div>
      )}
    </ReviewMainBlock>
  );
};

const ReviewMainBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Line = styled.div`
  width: 30%;
  margin: 10px;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 0 10px;
  }
`;

const ReviewUl = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default ReviewMain;

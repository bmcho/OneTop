import styled from 'styled-components';
import { reviews } from '../../utils/reviewSample';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';

const Review = () => {
  return (
    <ReviewBlock>
      <ReviewHeader>
        <h4>REVIEW</h4>
      </ReviewHeader>
      <ReviewMain>
        <Line>
          <ReviewUl>
            {reviews
              .filter((_, idx) => idx % 3 === 0)
              .map((review) => (
                <ReviewItem key={review.id} {...review} />
              ))}
          </ReviewUl>
        </Line>
        <Line>
          <ReviewUl>
            {reviews
              .filter((_, idx) => idx % 3 === 1)
              .map((review) => (
                <ReviewItem key={review.id} {...review} />
              ))}
          </ReviewUl>
        </Line>
        <Line>
          <ReviewUl>
            {reviews
              .filter((_, idx) => idx % 3 === 2)
              .map((review) => (
                <ReviewItem key={review.id} {...review} />
              ))}
          </ReviewUl>
        </Line>
      </ReviewMain>
      <ReviewForm />
    </ReviewBlock>
  );
};

const ReviewBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewHeader = styled.div`
  h4 {
    font-size: 24px;
    font-weight: 700;
    margin: 0 auto;
    letter-spacing: 1.5px;
  }
  width: 100vw;
  display: flex;
  justify-content: center;
  position: sticky;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) => theme.color.yellow2};
  top: 0;
  left: 0;
  right: 0;
`;

const ReviewMain = styled.div`
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

export default Review;

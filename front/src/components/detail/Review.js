import styled from 'styled-components';
import ReviewItem from './review/ReviewItem';
import ReviewPostForm from './review/ReviewPostForm';
import ReviewMain from './review/ReviewMain';

const Review = () => {
  return (
    <ReviewBlock>
      <ReviewHeader>
        <h4>REVIEW</h4>
      </ReviewHeader>
      <ReviewMain />
      <ReviewPostForm />
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
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
`;

export default Review;

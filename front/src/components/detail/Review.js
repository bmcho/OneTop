import styled from 'styled-components';

const Review = () => {
  return (
    <ReviewBlock>
      <ReviewHeader>
        <h4>REVIEW</h4>
      </ReviewHeader>
    </ReviewBlock>
  );
};

const ReviewBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200vh;
`;
const ReviewHeader = styled.div`
  h4 {
    font-size: 24px;
    font-weight: 700;
    margin: 0 auto;
    letter-spacing: 1.5px;
  }
  width: 100%;
  display: flex;
  justify-content: center;
  position: sticky;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  right: 0;
`;
export default Review;

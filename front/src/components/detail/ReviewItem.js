import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const ReviewItem = ({ name, date, rating, text }) => {
  const ref = useRef();
  const [isOverText, setIsOverText] = useState();
  const [moreText, setMoreText] = useState(false);
  const lineLimit = 5;
  const lineheight = 18;

  const moreTextHandle = () => {
    setMoreText((prev) => !prev);
  };

  useEffect(() => {
    if (ref.current.clientHeight > lineheight * lineLimit) {
      ref.current.style.maxHeight = `${lineheight * lineLimit}px`;
      ref.current.style.overflowY = 'hidden';
      setIsOverText(true);
    }
  }, []);

  useEffect(() => {
    if (moreText) {
      ref.current.style.maxHeight = ``;
      ref.current.style.overflowY = '';
    } else {
      ref.current.style.maxHeight = `${lineheight * lineLimit}px`;
      ref.current.style.overflowY = 'hidden';
    }
  }, [moreText]);

  return (
    <ReviewItemLi>
      <div className="review_info">
        <span className="writer_name">{name}</span>
        <span className="write_date">{date}</span>
      </div>
      <div className="review_rating">{rating}</div>
      <p ref={ref} lineheight={lineheight}>
        {text}
      </p>
      {isOverText && <button onClick={moreTextHandle}>더보기</button>}
    </ReviewItemLi>
  );
};

const ReviewItemLi = styled.li`
  .review_info {
    margin-bottom: 20px;
    .write_date::before {
      content: '|';
      padding: 0 10px;
    }
  }
  .review_rating {
    margin-bottom: 20px;
  }
  ${({ lineheight }) => css`
    p {
      line-height: ${lineheight}px;
    }
  `}
  border: 1px solid ${({ theme }) => theme.color.lightGray1};
  padding: 30px;
  margin: 10px 0;
  line-height: 18px;
`;

export default ReviewItem;

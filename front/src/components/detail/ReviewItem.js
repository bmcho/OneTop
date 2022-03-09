import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineMoreVert } from 'react-icons/md';

const ReviewItem = ({
  id,
  fk_product_num,
  comment,
  review_images,
  create_date,
  modify_data,
}) => {
  const ref = useRef();
  const [isOverText, setIsOverText] = useState();
  const [moreText, setMoreText] = useState(false);
  const [isEtcOpen, setIsEtcOpen] = useState(false);
  const lineLimit = 5;
  const lineheight = 18;
  const dispatch = useDispatch();

  const moreTextHandle = () => {
    setMoreText((prev) => !prev);
  };

  const openEtcHandle = () => {
    setIsEtcOpen((prev) => !prev);
  };

  const modifyReviewHandle = (id) => {
    dispatch()
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
    <ReviewItemLi lineheight={lineheight}>
      <StyledMdOutlineMoreVert size={20} onClick={openEtcHandle} />
      {isEtcOpen && (
        <EtcBlock>
          <button>수정</button>
          <button>삭제</button>
        </EtcBlock>
      )}
      <div className="review_info">
        <span className="writer_name">{`익명`}</span>
        <span className="write_date">{modify_data || create_date}</span>
      </div>
      {/* <div className="review_rating">{rating}</div> */}
      <p ref={ref}>{comment}</p>
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
      word-wrap: break-word;
    }
  `}
  position: relative;
  border: 1px solid ${({ theme }) => theme.color.lightGray1};
  padding: 30px;
  margin: 10px 0;
  line-height: 18px;
`;

const StyledMdOutlineMoreVert = styled(MdOutlineMoreVert)`
  position: absolute;
  top: 28px;
  right: 12px;
  cursor: pointer;
`;

const EtcBlock = styled.div`
  position: absolute;
  top: 48px;
  right: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 2px 12px 0 rgb(0 0 0 / 6%);
  background-color: white;
  padding: 10px 0;
  border-radius: 10px;
  z-index: 2;
  button {
    padding: 5px 20px;
  }
  button:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default ReviewItem;

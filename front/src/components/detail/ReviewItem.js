import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineMoreVert } from 'react-icons/md';
import {
  deleteProductReviewAction,
  modifyProductReviewAction,
} from '../../stores/modules/productReview';
import { MdOutlineClose } from 'react-icons/md';
import ReviewImageInputer from './ReviewImageInputer';

const ReviewItem = ({
  id,
  fk_product_num,
  comment,
  review_images,
  create_date,
  modify_data,
}) => {
  const ref = useRef();
  const errorRef = useRef();
  const [isOverText, setIsOverText] = useState();
  const [moreText, setMoreText] = useState(false);
  const [isEtcOpen, setIsEtcOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [password, setPassword] = useState({
    modify: '',
    delete: '',
  });
  const [modifyValue, setModifyValue] = useState(comment);

  const { error } = useSelector((state) => state.productReview.modify);
  const [loading, setLoading] = useState(false);

  const lineLimit = 5;
  const lineheight = 18;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) return;
    if (!loading) return;
    errorRef.current.style.display = 'flex';
    setTimeout(() => {
      errorRef.current.style.display = 'none';
      setLoading(false);
    }, 2000);
  }, [error]);

  const passwordChangeHandle = (e) => {
    const { name } = e.target;
    setPassword((state) => {
      return {
        ...state,
        [name]: e.target.value,
      };
    });
  };

  const moreTextHandle = () => {
    setMoreText((prev) => !prev);
  };

  const openEtcHandle = () => {
    if (isDeleteOpen || isModifyOpen) return;
    setIsEtcOpen((prev) => !prev);
  };

  const reviewModifyHandle = () => {
    setIsEtcOpen(false);
    setIsModifyOpen((prev) => !prev);
  };

  const reviewDeleteHandle = () => {
    setIsEtcOpen(false);
    setIsDeleteOpen((prev) => !prev);
  };

  const modifyCancelHadle = () => {
    setIsModifyOpen(false);
    setModifyValue(comment);
  };

  const reviewModifySubmitHandle = (e) => {
    e.preventDefault();
    dispatch(
      modifyProductReviewAction({
        review_data: {
          id,
          fk_product_num,
          password: password.modify,
          comment: modifyValue,
          images: [],
        },
        action: 'modify',
      })
    );
    setPassword({
      modify: '',
      delete: '',
    });
    setModifyValue(comment);
    setIsModifyOpen(false);
    setLoading(true);
  };

  const reviewDeleteSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(
      deleteProductReviewAction({
        id,
        fk_product_num,
        password: `${password.delete}`,
      })
    );
    setPassword({
      modify: '',
      delete: '',
    });
    setLoading(true);
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
      ref.current.style.maxHeight = '';
      ref.current.style.overflowY = '';
    } else {
      ref.current.style.maxHeight = `${lineheight * lineLimit}px`;
      ref.current.style.overflowY = 'hidden';
    }
  }, [moreText]);

  return (
    <ReviewItemLi lineheight={lineheight}>
      <ErrorBlock ref={errorRef}>
        <div>비밀번호를 잘못 입력했습니다!.</div>
      </ErrorBlock>
      {isEtcOpen && (
        <EtcBlock>
          <button onClick={reviewModifyHandle}>수정</button>
          <button onClick={reviewDeleteHandle}>삭제</button>
        </EtcBlock>
      )}
      {isDeleteOpen && (
        <ModifyBlock>
          <ModifyInput onSubmit={reviewDeleteSubmitHandle}>
            <StyledMdOutlineClose onClick={reviewDeleteHandle} />
            <div>비밀번호를 입력해주세요.</div>
            <div>
              <input
                type="password"
                name="delete"
                value={password.delete}
                onChange={passwordChangeHandle}
              />
              <button type="submit">확인</button>
            </div>
          </ModifyInput>
        </ModifyBlock>
      )}
      <div className="review_info">
        <span className="writer_name">익명</span>
        <span className="write_date">{modify_data || create_date}</span>
      </div>
      <StyledMdOutlineMoreVert size={20} onClick={openEtcHandle} />
      <DefaltComment active={!isModifyOpen}>
        <p ref={ref}>{comment}</p>
        {isOverText && <button onClick={moreTextHandle}>더보기</button>}
        {review_images.length !== 0 && (
          <ImageWrapper>
            {review_images.map(({ img_path }) => {
              return <img src={`data:image/;base64,${img_path}`} />;
            })}
          </ImageWrapper>
        )}
      </DefaltComment>
      <ModifyForm onSubmit={reviewModifySubmitHandle} active={isModifyOpen}>
        <div className="input-wrapper">
          <input
            type="password"
            name="modify"
            value={password.modify}
            placeholder="비밀번호"
            onChange={passwordChangeHandle}
            disabled={!isModifyOpen}
          />
        </div>
        <textarea
          value={modifyValue}
          onChange={(e) => setModifyValue(e.target.value)}
          disabled={!isModifyOpen}
        ></textarea>
        <div className="modify-btn-wrapper">
          <button type="submit" disabled={!isModifyOpen}>
            수정 완료
          </button>
          <button disabled={!isModifyOpen} onClick={modifyCancelHadle}>
            수정 취소
          </button>
        </div>
      </ModifyForm>
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

const ModifyBlock = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMdOutlineClose = styled(MdOutlineClose)`
  position: absolute;
  top: 10%;
  right: 5%;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.orange1};
  }
`;

const ModifyInput = styled.form`
  position: relative;
  width: 80%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  gap: 20px;
  margin-top: 30px;
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`;

const ModifyForm = styled.form`
  display: none;
  flex-direction: column;
  ${(props) =>
    props.active &&
    css`
      display: flex;
      textarea {
        height: 200px;
      }
    `}

  .modify-btn-wrapper {
    display: flex;
    justify-content: center;
    button + button {
      margin-left: 10px;
    }
  }
`;

const DefaltComment = styled.div`
  display: none;
  ${(props) =>
    props.active &&
    css`
      display: block;
    `}
`;

const ErrorBlock = styled.div`
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  transition: all 1s ease-in-out;
  div {
    background-color: white;
    padding: 20px;
  }
`;

export default ReviewItem;

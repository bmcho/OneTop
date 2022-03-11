import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  MdOutlineMoreVert,
  MdOutlineCancel,
  MdOutlineClose,
  MdCameraAlt,
} from 'react-icons/md';
import {
  deleteProductReviewAction,
  modifyProductReviewAction,
} from '../../stores/modules/productReview';

const ReviewItem = ({
  id,
  fk_product_num,
  comment,
  review_images,
  create_date,
  modify_data,
  hashtag,
}) => {
  const ref = useRef();
  const errorRef = useRef();
  const [isOverText, setIsOverText] = useState(false);
  const [moreText, setMoreText] = useState(false);
  const [isEtcOpen, setIsEtcOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [password, setPassword] = useState({
    modify: '',
    delete: '',
  });
  const [modifyValue, setModifyValue] = useState(comment || '');
  const [modifyImages, setModifyImages] = useState(review_images || []);
  const [modifyHashTag, setModifyHashTag] = useState(
    hashtag ? hashtag.split(',') : []
  );
  const [hashTagValue, setHashTagValue] = useState('');

  const { error: modifyError } = useSelector(
    (state) => state.productReview.modify
  );
  const { error: deleteError } = useSelector(
    (state) => state.productReview.delete
  );
  const [loading, setLoading] = useState(false);

  const lineLimit = 5;
  const lineheight = 18;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!modifyError && !deleteError) return;
    if (!loading) return;
    errorRef.current.style.display = 'flex';
    setTimeout(() => {
      errorRef.current.style.display = 'none';
      setLoading(false);
    }, 2000);
  }, [modifyError, deleteError]);

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
    if (loading) return;
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

  const modifyCancelHandle = () => {
    setIsModifyOpen(false);
    setModifyValue(comment);
  };

  const modifyImageRemoveHandle = (imgPath) => {
    setModifyImages(modifyImages.filter((img) => img.img_path !== imgPath));
  };

  const modifyReviewCommentHandle = (e) => {
    if (e.target.value.length > 2000)
      return alert('리뷰는 2000자 까지 입력이 가능합니다.');
    setModifyValue(e.target.value);
  };

  const addFileHandle = (e) => {
    e.preventDefault();
    const { files } = e.target;
    if (modifyImages.length + files.length > 5)
      return alert('이미지는 최대 5개까지 넣을 수 있습니다.');
    Object.values(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setModifyImages((prev) => {
          return [...prev, { img_path: reader.result }];
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
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
          images: modifyImages.map((img) => img.img_path),
          hashtag: modifyHashTag.join(','),
        },
        action: 'modify',
      })
    );
    setPassword({
      modify: '',
      delete: '',
    });
    setModifyHashTag(hashtag ? hashtag.split(',') : []);
    setModifyImages(review_images || []);
    setModifyValue(comment || '');
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
    setIsModifyOpen(false);
    setLoading(true);
  };

  const hashTagEventHandle = (e) => {
    if (e.charCode === 32) {
      e.preventDefault();
      let newHashTag = e.target.value.replace(/[ #]/gi, '');
      if (!newHashTag) return setHashTagValue('');
      newHashTag = '#' + newHashTag;
      setModifyHashTag((prev) => {
        return [...prev, newHashTag];
      });
      setHashTagValue('');
    } else if (e.keyCode === 8) {
      if (e.target.value) return;
      setModifyHashTag((prev) => {
        return prev.slice(0, -1);
      });
    }
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
        <DeleteBlock>
          <DeleteInput onSubmit={reviewDeleteSubmitHandle}>
            <StyledMdOutlineClose onClick={reviewDeleteHandle} />
            <div>비밀번호를 입력해주세요.</div>
            <div>
              <input
                type="password"
                name="delete"
                autoComplete="off"
                value={password.delete}
                onChange={passwordChangeHandle}
              />
              <button type="submit">확인</button>
            </div>
          </DeleteInput>
        </DeleteBlock>
      )}
      <div className="review_info">
        <span className="writer_name">익명</span>
        <span className="write_date">{modify_data || create_date}</span>
      </div>

      <StyledMdOutlineMoreVert size={20} onClick={openEtcHandle} />
      <DefaltComment active={!isModifyOpen}>
        <p ref={ref}>{comment}</p>
        {isOverText && <button onClick={moreTextHandle}>더보기</button>}
        {hashtag && (
          <HashTagsBlock>
            {hashtag.split(',').map((tag, index) => {
              return (
                <HashTagWrapper key={`${tag.slice(1)}-${index}`}>
                  {tag}
                </HashTagWrapper>
              );
            })}
          </HashTagsBlock>
        )}

        {review_images.length !== 0 && (
          <ImageWrapper>
            {review_images.map(({ img_path }, index) => {
              return <img key={index} src={img_path} alt={'리뷰이미지'} />;
            })}
          </ImageWrapper>
        )}
      </DefaltComment>
      <ModifyForm onSubmit={reviewModifySubmitHandle} active={isModifyOpen}>
        <InputWrapper>
          <ReviewWriterInfo>
            <input
              type="password"
              name="modify"
              value={password.modify}
              autoComplete="off"
              placeholder="비밀번호"
              onChange={passwordChangeHandle}
              disabled={!isModifyOpen}
            />
            <div className="text-limit">{`${modifyValue.length} / 2000`}</div>
            <AddImageWrapper>
              <label className="label" htmlFor={`review-${id}-image-input`}>
                <StyledMdCameraAlt size={25} />
              </label>
              <input
                id={`review-${id}-image-input`}
                className="input"
                accept="image/*"
                type="file"
                multiple={true}
                hidden={true}
                onChange={addFileHandle}
              />
            </AddImageWrapper>
          </ReviewWriterInfo>
        </InputWrapper>
        <ReviewTextArea
          placeholder="리뷰를 입력해주세요"
          value={modifyValue}
          onChange={modifyReviewCommentHandle}
          disabled={!isModifyOpen}
        />
        <HashTagsBlock>
          {modifyHashTag !== 0 &&
            modifyHashTag.map((tag, index) => {
              return (
                <HashTagWrapper key={`${tag.slice(1)}-${index}`}>
                  {tag}
                </HashTagWrapper>
              );
            })}
          <input
            type="text"
            placeholder="해시태그"
            name="hashTag"
            value={hashTagValue}
            onChange={(e) => setHashTagValue(e.target.value)}
            onKeyPress={hashTagEventHandle}
            onKeyDown={hashTagEventHandle}
          />
        </HashTagsBlock>
        <div className="modify-btn-wrapper">
          <button type="submit" disabled={!isModifyOpen}>
            수정 완료
          </button>
          <button disabled={!isModifyOpen} onClick={modifyCancelHandle}>
            수정 취소
          </button>
        </div>
        <AddImageInfo>
          {modifyImages.map((file, index) => {
            const { img_path } = file;
            return (
              <AddImageItem key={index}>
                <img src={img_path} />
                <StyledMdOutlineCancel
                  onClick={() => modifyImageRemoveHandle(img_path)}
                />
              </AddImageItem>
            );
          })}
        </AddImageInfo>
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
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.lightGray1};
  padding: 30px;
  margin: 10px 0;
  line-height: 18px;
  @media screen and (max-width: 1080px) {
    width: 90%;
  }
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

const DeleteBlock = styled.div`
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

const DeleteInput = styled.form`
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
  width: 100%;
  display: none;
  flex-direction: column;
  ${(props) =>
    props.active &&
    css`
      display: flex;
    `}
  .modify-btn-wrapper {
    display: flex;
    justify-content: center;
    margin: 10px 0 30px 0;
    button {
      padding: 5px 10px;
      border: 1px solid ${({ theme }) => theme.color.gray1};
    }
    button + button {
      margin-left: 10px;
    }
  }
`;
const ReviewWriterInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
  .text-limit {
    position: absolute;
    top: 5px;
    right: 40px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
`;

const AddImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
const StyledMdCameraAlt = styled(MdCameraAlt)`
  cursor: pointer;
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

const AddImageInfo = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const AddImageItem = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100%;
    height: 60px;
    object-fit: contain;
  }
`;

const StyledMdOutlineCancel = styled(MdOutlineCancel)`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const HashTagsBlock = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  border: 1px solid ${({ theme }) => theme.color.lightGray1};
  padding: 20px;
  margin-top: 5px;
  input[type='text'] {
    border: none;
  }
`;

const HashTagWrapper = styled.div`
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.color.orange1};
  color: ${({ theme }) => theme.color.orange1};
`;
export default ReviewItem;

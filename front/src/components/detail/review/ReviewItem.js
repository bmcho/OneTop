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
} from '../../../stores/modules/productReview';
import Hashtag from '../../commons/hashtag/Hashtag';
import ReviewInput from './ReviewInput';
import ReviewDelete from './reviewDelete/ReviewDelete';

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
  const [moreText, setMoreText] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isEtcOpen, setIsEtcOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    delete: {
      password: '',
    },
    modify: {
      password: '',
      comment: comment || '',
      hashTag: '',
    },
  });
  const [modifyImages, setModifyImages] = useState(review_images || []);
  const [modifyHashTags, setModifyHashTags] = useState(
    hashtag ? hashtag.split(',') : []
  );

  const { error: modifyError } = useSelector(
    (state) => state.productReview.modify
  );
  const { error: deleteError } = useSelector(
    (state) => state.productReview.delete
  );

  const lineLimit = 5;
  const lineheight = 18;
  const dispatch = useDispatch();

  const inputChangeHandle = (e) => {
    const { name } = e.target;
    if (name === 'comment' && e.target.value.length > 2000) {
      alert('리뷰는 2000자 까지 입력이 가능합니다.');
      return;
    }
    const actionType = isModifyOpen ? 'modify' : 'delete';

    setInputValues((inputValue) => ({
      ...inputValue,
      [actionType]: {
        ...inputValues[actionType],
        [name]: e.target.value,
      },
    }));
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
    setInputValues((prev) => ({
      ...prev,
      modify: { ...prev.modify, comment: comment },
    }));
    setModifyHashTags(hashtag ? hashtag.split(',') : []);
  };

  const modifyImageRemoveHandle = (index) => {
    setModifyImages(modifyImages.filter((img, idx) => idx !== index));
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
          password: inputValues.modify.password,
          comment: inputValues.modify.comment,
          images: modifyImages.map((img) => img.img_path),
          hashtag: modifyHashTags.join(','),
        },
        action: 'modify',
      })
    );
    setInputValues({
      delete: {
        password: '',
      },
      modify: {
        password: '',
        comment: comment || '',
        hashTag: '',
      },
    });
    setModifyHashTags(hashtag ? hashtag.split(',') : []);
    setModifyImages(review_images || []);
    setIsModifyOpen(false);
    setLoading(true);
  };

  const reviewDeleteSubmitHandle = (e) => {
    e.preventDefault();
    dispatch(
      deleteProductReviewAction({
        id,
        fk_product_num,
        password: inputValues.delete.password,
      })
    );
    setInputValues({
      delete: {
        password: '',
      },
      modify: {
        password: '',
        comment: comment || '',
        hashTag: '',
      },
    });
    setIsDeleteOpen(false);
    setLoading(true);
  };

  const hashTagEventHandle = (e) => {
    if (e.charCode === 32) {
      e.preventDefault();
      let newHashTag = e.target.value.replace(/[ #]/gi, '');
      if (!newHashTag)
        return setInputValues((prev) => ({
          ...prev,
          modify: { ...prev.modify, hashTag: '' },
        }));
      setModifyHashTags((prev) => {
        return [...prev, '#' + newHashTag];
      });
      setInputValues((prev) => ({
        ...prev,
        modify: { ...prev.modify, hashTag: '' },
      }));
    } else if (e.keyCode === 8) {
      if (e.target.value) return;
      setModifyHashTags((prev) => {
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

  useEffect(() => {
    if (!modifyError && !deleteError) return;
    if (!loading) return;
    errorRef.current.style.display = 'flex';
    setTimeout(() => {
      errorRef.current.style.display = 'none';
      setLoading(false);
    }, 3000);
  }, [modifyError, deleteError]);

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
        <ReviewDelete
          password={inputValues.delete.password}
          inputChangeHandle={inputChangeHandle}
          reviewDeleteSubmitHandle={reviewDeleteSubmitHandle}
          reviewDeleteHandle={reviewDeleteHandle}
        />
      )}
      <div className="review_info">
        <span className="writer_name">익명</span>
        <span className="write_date">
          {modify_data?.split('T').join(' ') ||
            create_date?.split('T').join(' ')}
        </span>
      </div>
      <StyledMdOutlineMoreVert size={20} onClick={openEtcHandle} />
      <DefaltComment active={!isModifyOpen}>
        <p ref={ref}>{comment}</p>
        {isOverText && (
          <button onClick={() => setMoreText((prev) => !prev)}>더보기</button>
        )}
        {hashtag && (
          <HashTagsBlock>
            {hashtag.split(',').map((tag, index) => {
              return <Hashtag key={`${tag.slice(1)}-${index}`}>{tag}</Hashtag>;
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
          <ReviewInput
            {...inputValues.modify}
            hashTags={modifyHashTags}
            addFileHandle={addFileHandle}
            inputChangeHandle={inputChangeHandle}
            hashTagEventHandle={hashTagEventHandle}
          />
        </InputWrapper>
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
                  onClick={() => modifyImageRemoveHandle(index)}
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
  z-index: 2;
  div {
    background-color: white;
    padding: 20px;
  }
`;

const HashTagsBlock = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.lightGray1};
  padding: 20px;
  margin-top: 5px;
  input[type='text'] {
    border: none;
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

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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

export default ReviewItem;

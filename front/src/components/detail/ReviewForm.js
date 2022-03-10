import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import {
  postProductReviewAction,
  postProductReviewImageAction,
} from '../../stores/modules/productReview';
import { useRouter } from 'next/router';
import { MdOutlineCancel, MdCameraAlt } from 'react-icons/md';

const ReviewForm = () => {
  const [inputValues, setInputValues] = useState({
    password: '',
    comment: '',
    hashTag: '',
  });
  const [imgFiles, setImgFiles] = useState([]);
  const [hashTags, setHashTags] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const inputChangeHandle = (e) => {
    const { name } = e.target;
    if (name === 'comment' && e.target.value.length > 2000) {
      alert('리뷰는 2000자 까지 입력이 가능합니다.');
      return;
    }
    setInputValues((inputvalue) => ({
      ...inputvalue,
      [name]: e.target.value,
    }));
  };

  const removeFileHandle = (fileInfo) => {
    setImgFiles((prev) => prev.filter((file) => file.fileInfo !== fileInfo));
  };

  const hashTagReset = () => {
    setInputValues((prev) => ({ ...prev, hashTag: '' }));
  };

  const hashTagEventHandle = (e) => {
    if (e.charCode === 32) {
      e.preventDefault();
      let newHashTag = e.target.value.replace(/[ #]/gi, '');
      if (!newHashTag) return hashTagReset();
      newHashTag = '#' + newHashTag;
      setHashTags((prev) => {
        return [...prev, newHashTag];
      });
      hashTagReset();
    } else if (e.keyCode === 8) {
      if (e.target.value) return;
      setHashTags((prev) => {
        return prev.slice(0, -1);
      });
    }
  };

  const addFileHandle = (e) => {
    e.preventDefault();
    const { files } = e.target;
    if (imgFiles.length + files.length > 5)
      return alert('이미지는 최대 5개까지 넣을 수 있습니다.');
    Object.values(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImgFiles((prev) => {
          return [
            ...prev,
            {
              id: file.lastModified,
              encoingFile: reader.result,
              name: file.name,
              fileInfo: file,
            },
          ];
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const postReview = (e) => {
    e.preventDefault();
    if (!inputValues.password) return alert('비밀번호을 입력해주세요.');
    if (!inputValues.comment) return alert('리뷰을 입력해주세요.');
    dispatch(
      postProductReviewAction({
        review_data: {
          fk_product_num: parseInt(id),
          password: inputValues.password,
          comment: inputValues.comment,
          hashtag: hashTags.join(','),
          images: imgFiles.map(({ encoingFile }) => encoingFile),
        },
        action: 'create',
      })
    );
    setInputValues({
      password: '',
      comment: '',
    });
    setImgFiles([]);
    setHashTags([]);
  };
  return (
    <ReviewFormBlock>
      <ReviewInput onSubmit={postReview}>
        <InputWrapper>
          <ReviewWriterInfo>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              autoComplete="off"
              value={inputValues.password}
              onChange={inputChangeHandle}
            />
            <div className="text-limit">{`${inputValues.comment.length} / 2000`}</div>
            <AddImageWrapper>
              <label className="label" htmlFor="input">
                <StyledMdCameraAlt size={25} />
              </label>
              <input
                id="input"
                className="input"
                accept="image/*"
                type="file"
                multiple={true}
                hidden={true}
                onChange={addFileHandle}
              />
            </AddImageWrapper>
          </ReviewWriterInfo>
          <ReviewTextArea
            placeholder="리뷰를 입력해주세요"
            value={inputValues.comment}
            name="comment"
            onChange={inputChangeHandle}
          />
          <HashTagsBlock>
            {hashTags.length !== 0 &&
              hashTags.map((tag) => {
                return <HashTagWrapper>{tag}</HashTagWrapper>;
              })}
            <input
              type="text"
              placeholder="해시태그"
              name="hashTag"
              value={inputValues.hashTag}
              onChange={inputChangeHandle}
              onKeyPress={hashTagEventHandle}
              onKeyDown={hashTagEventHandle}
            />
          </HashTagsBlock>
          <SubmitWrapper>
            <button type="submit">등록</button>
          </SubmitWrapper>
        </InputWrapper>
        <AddImageInfo>
          {imgFiles.map((file, index) => {
            const { id, encoingFile, name, fileInfo } = file;
            return (
              <AddImageItem key={id + index}>
                <img src={encoingFile} />
                <div>{name}</div>
                <StyledMdOutlineCancel
                  onClick={() => removeFileHandle(fileInfo)}
                />
              </AddImageItem>
            );
          })}
        </AddImageInfo>
      </ReviewInput>
    </ReviewFormBlock>
  );
};

const ReviewFormBlock = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  padding: 20px;
  border-top: 2px solid ${({ theme }) => theme.color.black};
  padding-bottom: 100px;
`;

const ReviewInput = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    padding: 5px 20px;
    border: 1px solid black;
  }
`;

const AddImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledMdCameraAlt = styled(MdCameraAlt)`
  cursor: pointer;
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

export default ReviewForm;

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { postProductReviewAction } from '../../stores/modules/productReview';
import { useRouter } from 'next/router';

const ReviewForm = () => {
  const [inputValues, setInputValues] = useState({
    nickName: '',
    password: '',
    comment: '',
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const inputChangeHandle = (e) => {
    const { name } = e.target;
    setInputValues((inputvalue) => ({
      ...inputvalue,
      [name]: e.target.value,
    }));
  };

  const postReview = (e) => {
    e.preventDefault();
    if (!inputValues.nickName) return alert('닉네임을 입력해주세요.');
    if (!inputValues.password) return alert('비밀번호을 입력해주세요.');
    if (!inputValues.comment) return alert('리뷰을 입력해주세요.');

    dispatch(
      postProductReviewAction({
        review_data: {
          fk_product_num: parseInt(id),
          password: inputValues.password,
          comment: inputValues.comment,
          images: [],
        },
        action: 'create',
      })
    );
    setInputValues({
      nickName: '',
      password: '',
      comment: '',
    });
  };
  return (
    <ReviewFormBlock>
      <ReviewInput onSubmit={postReview}>
        <InputWrapper>
          <ReviewWriterInfo>
            <input
              type="text"
              name="nickName"
              placeholder="닉네임"
              value={inputValues.nickName}
              onChange={inputChangeHandle}
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={inputValues.password}
              onChange={inputChangeHandle}
            />
          </ReviewWriterInfo>
          <ReviewTextArea
            placeholder="리뷰를 입력해주세요"
            value={inputValues.comment}
            name="comment"
            onChange={inputChangeHandle}
          ></ReviewTextArea>
          <ImageInputWrapper>
            <input type="file" id="input-file" />
          </ImageInputWrapper>
        </InputWrapper>
        <SubmitWrapper>
          <button type="submit">등록</button>
        </SubmitWrapper>
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
`;

const ReviewInput = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const ReviewWriterInfo = styled.div`
  display: flex;
  width: 20%;
  margin-bottom: 5px;
  input + input {
    margin-left: 5px;
  }
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
`;

const ImageInputWrapper = styled.div`
  input {
    width: 100px;
    height: 100px;
  }
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    padding: 5px 20px;
    border: 1px solid black;
  }
`;

export default ReviewForm;

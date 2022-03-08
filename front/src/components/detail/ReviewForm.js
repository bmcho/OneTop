import styled from 'styled-components';

const ReviewForm = () => {
  return (
    <ReviewFormBlock>
      <ReviewInput>
        <InputWrapper>
          <ReviewWriterInfo>
            <input type="text" placeholder="닉네임" />
            <input type="password" placeholder="비밀번호" />
          </ReviewWriterInfo>
          <ReviewTextArea placeholder="리뷰를 입력해주세요"></ReviewTextArea>
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
  height: 200px;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const ReviewWriterInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  padding: 0 20px 0 0;
  input + input {
    margin-top: 5px;
  }
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 100px;
`;

const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  button {
    padding: 5px 20px;
    border: 1px solid black;
  }
`;

export default ReviewForm;

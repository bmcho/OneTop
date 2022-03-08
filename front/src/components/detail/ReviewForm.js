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
          <ImageInputWrapper>
            <label className="input-file-button" for="input-file">
              업로드
            </label>
            <input type="file" id="input-file" style={{ display: 'none' }} />
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

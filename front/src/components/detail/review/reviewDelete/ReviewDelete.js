import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';

const ReviewDelete = ({
  password,
  reviewDeleteSubmitHandle,
  reviewDeleteHandle,
  inputChangeHandle,
}) => {
  return (
    <DeleteBlock>
      <DeleteInput onSubmit={reviewDeleteSubmitHandle}>
        <StyledMdOutlineClose onClick={reviewDeleteHandle} />
        <div>비밀번호를 입력해주세요.</div>
        <div>
          <input
            type="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={inputChangeHandle}
          />
          <button type="submit">확인</button>
        </div>
      </DeleteInput>
    </DeleteBlock>
  );
};

const DeleteBlock = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
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

const StyledMdOutlineClose = styled(MdOutlineClose)`
  position: absolute;
  top: 10%;
  right: 5%;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.orange1};
  }
`;
export default ReviewDelete;

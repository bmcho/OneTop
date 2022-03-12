import Modal from '../../commons/modal/Modal';
import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';

const DescriptionInfo = ({ name, open, description, modalOpenHandle }) => {
  return (
    <Modal open={open} modalOpenHandle={modalOpenHandle} kind="description">
      <Description>
        <StyledMdOutlineClose size="24" />
        <h5>제품정보</h5>
        {description}
      </Description>
    </Modal>
  );
};

const Description = styled.div`
  position: relative;
  h5 {
    font-size: 24px;
    font-weight: 900;
    padding: 20px 0;
    text-align: center;
  }
  width: 450px;
  padding: 0 25px 25px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  overflow-y: scroll;
  @media screen and (max-width: 500px) {
    width: 250px;
  }
`;

const StyledMdOutlineClose = styled(MdOutlineClose)`
  width: 24px;
  position: absolute;
  top: 20px;
  right: 30px;
  &:hover {
    color: ${({ theme }) => theme.color.orange2};
    cursor: pointer;
  }
`;
export default DescriptionInfo;

import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';

const CompareBox = ({ comparBoxOpenHandle }) => {
  return (
    <CompareBoxBlock>
      <StyledMdOutlineClose size={24} onClick={comparBoxOpenHandle} />
    </CompareBoxBlock>
  );
};

const CompareBoxBlock = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 370px;
  height: 680px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.color.yellow2};
  border-radius: 30px;
  padding: 16px 22px 0;
`;

const StyledMdOutlineClose = styled(MdOutlineClose)`
  position: absolute;
  top: 20px;
  right: 30px;
  &:hover {
    color: ${({ theme }) => theme.color.orange2};
    cursor: pointer;
  }
`;

export default CompareBox;

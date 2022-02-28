import styled from 'styled-components';
import { MdOutlineShoppingBasket } from 'react-icons/md';

const CompareBoxButton = ({ comparBoxOpenHandle }) => {
  return (
    <CompareBoxButtonBlock onClick={comparBoxOpenHandle}>
      <MdOutlineShoppingBasket size={50} />
    </CompareBoxButtonBlock>
  );
};

const CompareBoxButtonBlock = styled.div`
  position: fixed;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.yellow1};
  bottom: 25px;
  right: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.boxShadow.normal};
  cursor: pointer;
`;

export default CompareBoxButton;

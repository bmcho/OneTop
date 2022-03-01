import styled, { keyframes } from 'styled-components';
import { MdOutlineShoppingBasket } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CompareBoxButton = ({ comparBoxOpenHandle }) => {
  const { data } = useSelector((state) => state.productCompareInfo);
  const [nonCheckNum, setNonCheckNum] = useState(0);

  useEffect(() => {
    setNonCheckNum(data.filter((info) => !info.checked).length);
  }, [data]);

  return (
    <CompareBoxButtonBlock onClick={comparBoxOpenHandle}>
      {nonCheckNum !== 0 && <NonCheckAlerm>{nonCheckNum}</NonCheckAlerm>}
      <MdOutlineShoppingBasket size={50} />
    </CompareBoxButtonBlock>
  );
};

const ButtonAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
  animation: ${ButtonAnimation} 0.5s ease;
`;

const NonCheckAlerm = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: red;
`;

export default CompareBoxButton;

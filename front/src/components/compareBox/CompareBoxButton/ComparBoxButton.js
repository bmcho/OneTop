import styled, { keyframes } from 'styled-components';
import { MdOutlineShoppingBasket } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CompareBoxButton = ({ comparBoxOpenHandle }) => {
  const { data: productCompareInfos } = useSelector(
    (state) => state.productCompareInfo
  );
  const [nonCheckNum, setNonCheckNum] = useState(0);

  useEffect(() => {
    setNonCheckNum(productCompareInfos.filter((info) => !info.checked).length);
  }, [productCompareInfos]);

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
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  cursor: pointer;
  animation: ${ButtonAnimation} 0.5s ease;
  z-index: 5;
`;

const NonCheckAlerm = styled.div`
  position: absolute;
  right: -1px;
  top: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: red;
`;

export default CompareBoxButton;

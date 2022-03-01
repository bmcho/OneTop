import styled, { keyframes } from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineShoppingBasket } from 'react-icons/md';
import Image from 'next/image';
import { theme } from '../../../styles/theme';
import {
  removeProductCompareInfoAction,
  checkProductCompareInfoAction,
} from '../../stores/modules/productCompareInfo';
import { useEffect } from 'react';

const CompareBox = ({ comparBoxOpenHandle }) => {
  const { data, error } = useSelector((state) => state.productCompareInfo);
  const dispatch = useDispatch();

  const productRemoveHandle = (id) => {
    dispatch(removeProductCompareInfoAction(id));
  };

  useEffect(() => {
    dispatch(checkProductCompareInfoAction());
  }, []);

  return (
    <CompareBoxBlock>
      <StyledMdOutlineClose size={24} onClick={comparBoxOpenHandle} />
      <Header>
        <MdOutlineShoppingBasket size={30} />
        <span>보관함</span>
      </Header>
      {!data.length ? (
        <TextBlock>보관함에 넣기를 통해 상품을 넣어주세요</TextBlock>
      ) : (
        <ItemTable>
          <thead>
            <tr>
              <th></th>
              {data.map((d, index) => {
                return (
                  <th key={`${d.id}${index}`}>
                    <RemoveButton onClick={() => productRemoveHandle(d.id)}>
                      삭제
                    </RemoveButton>
                    <Image src={d.img} width={92.5} height={92.5} />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Brand</th>
              {data.map((d, index) => {
                return <td key={`${d.id}${index}`}>{d.brand}</td>;
              })}
            </tr>
            <tr>
              <th>Name</th>
              {data.map((d, index) => {
                return <td key={`${d.id}${index}`}>{d.name}</td>;
              })}
            </tr>
            <tr>
              <th>Price</th>
              {data.map((d, index) => {
                return <td key={`${d.id}${index}`}>{d.price}</td>;
              })}
            </tr>
            <tr>
              <th>Size</th>
              {data.map((d, index) => {
                return <td key={`${d.id}${index}`}>{d.capacity}</td>;
              })}
            </tr>
          </tbody>
        </ItemTable>
      )}
    </CompareBoxBlock>
  );
};

const CompareBoxAnimation = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const CompareBoxBlock = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 370px;
  height: 680px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.color.yellow2};
  border-radius: 30px;
  padding: 17px 22px 0;
  transform-origin: 100% 100%;
  animation: ${CompareBoxAnimation} 0.5s ease;
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

const Header = styled.div`
  span {
    margin-left: 8px;
  }
  height: 30px;
  text-align: left;
  line-height: 30px;
  font-size: 18px;
  font-weight: 900;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

const TextBlock = styled.div`
  height: 618px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemsUl = styled.ul`
  display: flex;
`;

const ItemLi = styled.li`
  width: 92.5px;
  display: flex;
  flex-direction: column;
  > div {
    height: 92.5px;
    border: 1px solid ${({ theme }) => theme.color.black};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ItemTable = styled.table`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.2px;
  td,
  th {
    width: 92.5px;
    height: 80px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  th {
    position: relative;
    background-color: #fcc419;
    background-color: rgba(252, 196, 25, 0.4);
  }
  thead th {
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 92.5px;
  height: 12px;
  font-size: 10px;
  z-index: 99;
  background-color: ${({ theme }) => theme.color.gray5};
  transition: all 0.5s ease;
  color: ${({ theme }) => theme.color.white};
  &:hover {
    height: 100%;
    font-size: 18px;
    font-weight: 900;
  }
`;

export default CompareBox;

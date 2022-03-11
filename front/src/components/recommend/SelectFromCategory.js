import { recommendCategory } from '../../utils/categoryUtil';
import { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryAction } from '../../stores/modules/productRecommend';

const SelectFromCategory = (props) => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.productRecommend);

  const setCategoryHandle = (category) => {
    dispatch(setCategoryAction(category));
  };

  return (
    <CategoriesWrapper>
      {recommendCategory.map((categoryItem, index) => (
        <Category
          key={index}
          onClick={() => setCategoryHandle(recommendCategory[index])}
          active={category === categoryItem}
        >
          {categoryItem}
        </Category>
      ))}
    </CategoriesWrapper>
  );
};

const CategoriesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;

  &::-webkit-scrollbar {
    height: 10px;
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.background3};
    opacity: 0.4;
    border-radius: 30px;
  }
`;

const Category = styled.button`
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.3);

  background-color: ${({ theme, active }) => active && theme.color.yellow2};
  &:hover {
    background-color: ${({ theme }) => theme.color.yellow2};
  }

  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => props.theme.color.yellow1};
      transition: all 0.4s ease-in;
    `}
`;

export default SelectFromCategory;

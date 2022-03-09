import Slider from '../search/searchCategory/Slider';
import { categories } from '../../utils/categoryUtil';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setCategoryAction } from '../../stores/modules/productRecommend';

const SelectFromCategory = ({ category, setCategory }) => {
  const categoryArr = Object.keys(categories);
  const dispatch = useDispatch();

  const setCategoryHandle = (category) => {
    setCategory(category);
    dispatch(setCategoryAction(category));
  };

  return (
    <CategoriesWrapper>
      {categoryArr.map((category, index) => {
        return (
          <Category
            key={index}
            onClick={() => setCategoryHandle(categoryArr[index])}
          >
            {category}
          </Category>
        );
      })}
    </CategoriesWrapper>
  );
};

const CategoriesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
`;

const Category = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 900;
  border: 1px solid rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: ${({ theme }) => theme.color.yellow2};
  }
`;

export default SelectFromCategory;

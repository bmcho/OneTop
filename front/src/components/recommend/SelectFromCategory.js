import Slider from '../search/searchCategory/Slider';
import { categories } from '../../utils/categoryUtil';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const SelectFromCategory = ({ largeCategoryIndex, selectLargeCategory }) => {
  const categoryArr = Object.keys(categories);

  return (
    <CategoriesWrapper>
      {categoryArr.map((category, index) => {
        return (
          <Category key={index} onClick={() => selectLargeCategory(index)}>
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
  background-color: ${({ theme }) => theme.color.yellow2};
`;

export default SelectFromCategory;

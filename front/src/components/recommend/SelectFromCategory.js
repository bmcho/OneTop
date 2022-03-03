import Slider from '../search/searchCategory/Slider';
import { categories } from '../../utils/categoryUtil';
import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const SelectFromCategory = () => {
  const categoryArr = Object.entries(categories);

  const [largeCategoryIndex, setLargeCategoryIndex] = useState(0);
  const selectLargeCategory = (index) => {
    setLargeCategoryIndex(index);
  };

  return (
    <Slider>
      {categoryArr?.map((category, index) => (
        <LargeCategory key={index} onClick={() => selectLargeCategory(index)}>
          <div className="img-wrapper">
            <Image
              src={'/images/category.jpg'}
              alt={'카테고리 이미지'}
              width={76}
              height={76}
              layout="fixed"
            />
          </div>
          <h4>{category[0]}</h4>
        </LargeCategory>
      ))}
    </Slider>
  );
};

const LargeCategory = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 100px;
  height: 200px;
  border-radius: 50px;

  .img-wrapper {
    width: 76px;
    height: 76px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    margin-bottom: 15px;
    overflow: hidden;
  }

  .img-wrapper img {
    display: block;
    object-fit: cover;
  }

  h4 {
    margin-bottom: 34px;
    font-weight: bold;
  }

  &:hover {
    background-color: ${(props) => props.theme.color.yellow1};
    transition: all 0.4s ease-in;
  }

  &:focus {
    background-color: ${(props) => props.theme.color.yellow1};
    transition: all 0.4s ease-in;
  }
`;

export default SelectFromCategory;

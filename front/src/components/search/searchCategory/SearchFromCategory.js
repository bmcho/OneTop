import { categories } from '../../../utils/categoryUtil';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Slider from './Slider';
import Image from 'next/image';

const SearchFromCategory = () => {
  const categoryArr = Object.entries(categories);

  const [largeCategoryIndex, setLargeCategoryIndex] = useState(0);
  const [smallCategoryIndex, setSmallCategoryIndex] = useState(null);

  const selectLargeCategory = (idx) => {
    setLargeCategoryIndex(idx);
    setSmallCategoryIndex(null);
  };

  const selectSmallCategory = (idx) => {
    console.log(idx);
    setSmallCategoryIndex(idx);
  };

  return (
    <Container>
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
      <SmallCategories>
        {categoryArr[largeCategoryIndex][1].map((category, idx) => {
          return (
            <SmallCategory key={idx} onClick={() => selectSmallCategory(idx)}>
              {category}
            </SmallCategory>
          );
        })}
      </SmallCategories>
      <div>
        {new Array(smallCategoryIndex).fill(0).map((e, idx) => (
          <div key={idx}>{idx}</div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

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

const SmallCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20px;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SmallCategory = styled.button`
  display: block;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-left: 20px;
  font-weight: 900;

  &:hover {
    color: #f08c00;
    border-color: #f08c00;
  }
  &:focus {
    color: #f08c00;
    border: 1px solid #f08c00;
  }
`;

export default SearchFromCategory;

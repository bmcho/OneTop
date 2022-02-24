import { categories } from '../../../utils/categoryUtil';
import styled, { css } from 'styled-components';
import { theme } from '../../../../styles/theme';
import { useState } from 'react';
import Slider from './Slider';

const SearchFromCategory = () => {
  const largeCategories = Object.keys(categories);
  const smallCategories = Object.values(categories);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const categoryExpandHandle = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Container>
      <Slider>
        {largeCategories?.map((category, index) => {
          return (
            <LargeCategory
              key={index}
              onClick={() => categoryExpandHandle(index)}
            >
              <div className="img-wrapper">
                <img src="/images/valeriia-miller-_42NKYROG7g-unsplash.jpg" />
              </div>
              <h4>{category}</h4>
            </LargeCategory>
          );
        })}
      </Slider>
      {smallCategories?.map((smallCategory, index) => {
        return (
          <SmallCategories key={index}>
            {smallCategory.map((category, idx) => {
              return (
                <SmallCategory active={index === selectedIndex} key={idx}>
                  {category}
                </SmallCategory>
              );
            })}
          </SmallCategories>
        );
      })}
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
    width: 76px;
    height: 76px;
    display: block;
    object-fit: cover;
  }

  h4 {
    margin-bottom: 34px;
    font-weight: bold;
  }

  &:hover {
    background-color: ${theme.color.yellow1};
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
  display: none;
  align-items: center;
  justify-content: center;
  padding: 10px 30px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-left: 20px;
  font-weight: 900;
  ${({ active }) => {
    return (
      active &&
      css`
        display: flex;
      `
    );
  }}
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

import { categories, categories3 } from '../../../utils/categoryUtil';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import Slider from './Slider';
import { useRouter } from 'next/router';

const SearchFromCategory = ({
  largeCategoryIndex,
  smallCategoryIndex,
  selectLargeCategory,
  selectSmallCategory,
}) => {
  const router = useRouter();

  const changResultRouteHandle = ({
    idx,
    largeCategory,
    smallCategory,
    page,
  }) => {
    selectSmallCategory(idx + 1);
    router.push({
      pathname: router.pathname,
      query: {
        largeCategory,
        smallCategory,
        page,
      },
    });
  };

  return (
    <Container>
      <Slider>
        {categories3.map((category) => (
          <LargeCategory
            key={category.id}
            active={largeCategoryIndex === parseInt(category.id)}
            onClick={() => selectLargeCategory(parseInt(category.id))}
          >
            <div className="img-wrapper">
              <img
                src={`/images/category${category.id}.png`}
                width={76}
                height={76}
                alt={'카테고리 이미지'}
              />
            </div>
            <h4>{category.large}</h4>
          </LargeCategory>
        ))}
      </Slider>
      <SmallCategories>
        {largeCategoryIndex &&
          categories3[largeCategoryIndex - 1].small.map((category, idx) => {
            return (
              <SmallCategory
                key={category.id}
                onClick={() =>
                  changResultRouteHandle({
                    idx,
                    largeCategory: categories3[largeCategoryIndex - 1].large,
                    smallCategory: category.label,
                    page: 1,
                  })
                }
              >
                {category.label}
              </SmallCategory>
            );
          })}
      </SmallCategories>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 30px;
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
  ${(props) =>
    props.active &&
    css`
      background-color: ${(props) => props.theme.color.yellow1};
      transition: all 0.4s ease-in;
    `}
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

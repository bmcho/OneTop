import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { media } from '../../../../styles/theme';
import useInterval from '../../../hooks/interval/useInterval';
import { categories } from '../../../utils/categoryUtil';

const Recommend = (props) => {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount((cur) => {
      if (cur === 2) {
        return 0;
      } else {
        return cur + 1;
      }
    });
  }, 3000);

  return (
    <SearchBlock>
      <div>
        <Title>나만의 맞춤 추천</Title>
        <Text>
          추천 알고리즘으로
          <br /> 나에게 맞는 상품을 추천합니다.
        </Text>
      </div>
      <div>
        <Category>
          {Object.keys(categories).map((category, idx) => {
            if (idx < 16) {
              return (
                <CategoryItem key={idx} active={count === idx % 3}>
                  {category}
                </CategoryItem>
              );
            }
          })}
        </Category>
      </div>
    </SearchBlock>
  );
};

const SearchBlock = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.h2`
  font-size: 27px;
  line-height: 40px;
  letter-spacing: -1.5px;
  transition: font-size 1s,line-height 1s,letter-spacing 1s;
  text-align: center;
}`;
const Text = styled.p`
  padding-top: 15px;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -1px;
  text-align: center;
`;
const Category = styled.div`
  display: flex;
  width: 500px;
  min-width: 300px;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 40px 0 100px 0;
  ${media.mobile} {
    width: 100%;
  }
`;
const CategoryItem = styled.div`
  padding: 10px;
  // border: 1px solid ${(props) => props.theme.color.lightGray1};
  border-radius: 30px;
  margin: 0 10px 10px 0;
  background-color: ${(props) => props.active && props.theme.color.yellow1};
`;
export default Recommend;

import React from 'react';
import styled from 'styled-components';
import Compare from '../src/components/intro/compare/Compare';
import Main from '../src/components/intro/main/Main';
import Recommend from '../src/components/intro/recommend/Recommend';
import Search from '../src/components/intro/search/Search';
import { NextSeo } from 'next-seo';

const Home = () => {
  return (
    <Block>
      <NextSeo
        title="HOME | reCco"
        description="대한민국 유일 화장품 추천 웹, 나에게 맞는지 제품인지 구매 전
        reCco의 비교 추천 서비스 통해 알아보세요. reCco의 다양한 검색 유형을 통해 구매 전 내가 찾는 제품이 맞는지 확인해 보세요. reCco는 누구보다 당신을 위해 고민하며 화장품을 찾다 지친 당신을 위해 도와줄 거예요"
      />
      <Main />
      <Recommend />
      <Compare />
      <Search />
    </Block>
  );
};
const Block = styled.div`
  // height: 100%;
`;

export default Home;

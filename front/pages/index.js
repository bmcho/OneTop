import React from 'react';
import styled from 'styled-components';
import Compare from '../src/components/intro/compare/Compare';
import Main from '../src/components/intro/main/main';
import Recommend from '../src/components/intro/recommend/Recommend';
import Search from '../src/components/intro/search/search';
const Home = () => {
  return (
    <Block>
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

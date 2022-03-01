import React from 'react';
import styled from 'styled-components';
import Main from '../src/components/intro/main/main';
import Search from '../src/components/intro/search/search';
const Home = () => {
  return (
    <Block>
      <Main />
      <Search />
    </Block>
  );
};
const Block = styled.div`
  height: 100%;
`;

export default Home;

import React from 'react';
import styled from 'styled-components';
import Header from '../src/components/header/header';
import SearchIngredient from '../src/components/searchIngredient/searchIngredient';
import SearchKeyword from '../src/components/searchKeyword/searchKeyword';

const search = (props) => (
  <SearchPageBlock>
    <Header />
    <div>search page</div>
    <SearchKeyword />
    <SearchIngredient />
  </SearchPageBlock>
);

const SearchPageBlock = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`
export default search;

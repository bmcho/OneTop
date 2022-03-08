import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchIngredient from '../src/components/search/searchIngredient/SearchIngredient';
import SearchKeyword from '../src/components/search/searchKeyword/SearchKeyword';
import SearchTypeTap from '../src/components/search/searchTypeTap/SearchTypeTap';
import CategoriesAndResult from '../src/components/search/searchCategory/CategoriesAndResult';
import { useRouter } from 'next/router';

const search = (props) => {
  const { tapState } = useSelector((state) => state.searchTypeTap);

  return (
    <SearchPageBlock>
      <SearchTypeTap />
      {tapState === 'category' && <CategoriesAndResult />}
      {tapState === 'keyword' && <SearchKeyword />}
      {tapState === 'ingredient' && <SearchIngredient />}
    </SearchPageBlock>
  );
};

const SearchPageBlock = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

export default search;

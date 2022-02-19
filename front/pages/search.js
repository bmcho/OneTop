import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../src/components/header/header';
import SearchIngredient from '../src/components/search/searchIngredient/searchIngredient';
import SearchKeyword from '../src/components/search/searchKeyword/searchKeyword';
import SearchTypeTap from '../src/components/search/searchTypeTap/searchTypeTap';
import searchKeyword from '../src/stores/modules/searchKeyword';

const search = (props) => {
  const { tapState } = useSelector(state => state.searchTypeTap)
  const renderSearch = useMemo(() => {
    if (tapState === 'category') {
      return
    } else if (tapState === 'keyword') {
      return <SearchKeyword />
    } else {
      return <SearchIngredient />
    }
  }, [tapState])

  return (
    <SearchPageBlock>
      <SearchTypeTap />
      {renderSearch}
    </SearchPageBlock>
  )
};

const SearchPageBlock = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`
export default search;

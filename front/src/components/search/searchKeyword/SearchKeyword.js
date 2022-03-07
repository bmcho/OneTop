import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import AutoComplete from './autoComplete/AutoComplete';
// import SearchBar from './searchBar/SearchBar';
import SearchHistory from './searchHistory/SearchHistory';
import SearchResult from './searchResult/SearchResult';
import styled from 'styled-components';
import SearchBar from '../searchKeyword/searchBar/SearchBar';

const SearchKeyword = (props) => {
  const { searchKeyword, autoCompleteKeyword } = useSelector(
    (state) => state.searchKeyword
  );
  return (
    <SearchKeywordBlock>
      <SearchBar />
      {searchKeyword.length !== 0 && <SearchResult />}
      {autoCompleteKeyword.length === 0 && searchKeyword.length === 0 && (
        <SearchHistory />
      )}
    </SearchKeywordBlock>
  );
};
const SearchKeywordBlock = styled.div`
  width: 80%;
  margin: 0 auto;
`;
export default SearchKeyword;

import React from 'react';
import { useSelector } from 'react-redux';
import SearchHistory from './searchHistory/SearchHistory';
import SearchResult from './searchResult/SearchResult';
import styled from 'styled-components';
import SearchBar from '../searchKeyword/searchBar/SearchBar';

const SearchKeyword = (props) => {
  const { keywordResultRequestData, autoCompleteKeyword } = useSelector(
    (state) => state.searchKeyword
  );

  return (
    <SearchKeywordBlock>
      <SearchBar />
      {keywordResultRequestData.keyword.length !== 0 && <SearchResult />}
      {autoCompleteKeyword.length === 0 &&
        keywordResultRequestData.keyword.length === 0 && <SearchHistory />}
    </SearchKeywordBlock>
  );
};
const SearchKeywordBlock = styled.div`
  width: 80%;
  margin: 0 auto;
`;
export default SearchKeyword;

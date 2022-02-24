import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AutoComplete from './autoComplete/AutoComplete';
import SearchBar from './searchBar/SearchBar';
import SearchHistory from './searchHistory/SearchHistory';
import SearchResult from './searchResult/SearchResult';
import styled from 'styled-components';

const SearchKeyword = (props) => {
  const { autoCompleteData, searchKeyword } = useSelector(
    (state) => state.searchKeyword
  );
  const { loadingStatus } = useSelector((state) => state.loading);

  useEffect(() => {
    console.log(loadingStatus);
  }, [loadingStatus]);

  return (
    <SearchKeywordBlock>
      <SearchBar />
      {autoCompleteData.length !== 0 && <AutoComplete />}
      {searchKeyword.length !== 0 && <SearchResult />}
      {autoCompleteData.length === 0 && searchKeyword.length === 0 && (
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

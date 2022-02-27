import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoComplete from './autoComplete/AutoComplete';
import SearchBar from './searchBar/SearchBar';
import SearchHistory from './searchHistory/SearchHistory';
import SearchResult from './searchResult/SearchResult';
import styled from 'styled-components';
import {
  setAutoCompleteKeywordAction,
  setSearchKeywordAction,
} from '../../../stores/modules/searchKeyword';

const SearchKeyword = (props) => {
  const dispatch = useDispatch();
  const { autoCompleteData, searchKeyword, autoCompleteKeyword } = useSelector(
    (state) => state.searchKeyword
  );
  const { loadingStatus } = useSelector((state) => state.loading);

  useEffect(() => {
    return () => {
      dispatch(setAutoCompleteKeywordAction(''));
      dispatch(setSearchKeywordAction(''));
    };
  }, []);

  useEffect(() => {
    console.log(loadingStatus);
  }, [loadingStatus]);

  return (
    <SearchKeywordBlock>
      <SearchBar />
      {autoCompleteData.length !== 0 && <AutoComplete />}
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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchKeywordHistoryAction } from '../../../stores/modules/searchKeyword';
import AutoComplete from './autoComplete/AutoComplete';
import SearchBar from './searchBar/SearchBar';
import SearchHistory from './searchHistory/SearchHistory';
import SearchResult from './searchResult/SearchResult';
import styled from 'styled-components';

const SearchKeyword = (props) => {
  const dispatch = useDispatch();
  const { autoCompleteData, autoCompleteKeyword } = useSelector(state => state.searchKeyword);

  // useEffect(() => {
  //   const keywords = JSON.parse(localStorage.getItem('keywords') || '[]')
  //   dispatch(setSearchKeywordHistoryAction(keywords))
  // }, [])

  return (
    <SearchKeywordBlock>
      <SearchBar />
      {autoCompleteData.length ? <AutoComplete /> :
        autoCompleteKeyword ? <SearchResult /> : <SearchHistory />}

    </SearchKeywordBlock>
  )
};
const SearchKeywordBlock = styled.div`
  width: 80%;
  margin: 0 auto;
`
export default SearchKeyword;

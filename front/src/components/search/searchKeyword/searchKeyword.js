import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchKeywordHistoryAction } from '../../../stores/modules/searchKeyword';
import AutoComplete from './autoComplete/autoComplete';
import SearchBar from './searchBar/searchBar';
import SearchHistory from './searchHistory/searchHistory';
import SearchResult from './searchResult/searchResult';

const SearchKeyword = (props) => {
  const dispatch = useDispatch();
  const { autoCompleteData, autoCompleteKeyword } = useSelector(state => state.searchKeyword);
  useEffect(() => {
    const keywords = JSON.parse(localStorage.getItem('keywords') || '[]')
    dispatch(setSearchKeywordHistoryAction(keywords))
  }, [])

  return (
    <div>
      <div>searchKeyword</div>

      <SearchBar />
      {autoCompleteData.length ? <AutoComplete /> :
        autoCompleteKeyword ? <SearchResult /> : <SearchHistory />}

    </div>
  )
};

export default SearchKeyword;

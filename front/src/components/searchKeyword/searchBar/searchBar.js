import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchKeywordAction, setAutoCompleteKeywordAction, setSearchKeywordHistoryAction } from '../../../stores/modules/searchKeyword';

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const { autoCompleteKeyword, searchResultData } = useSelector(state => state.searchKeyword);

  const changeSearchValue = (e) => {
    dispatch(setAutoCompleteKeywordAction(e.target.value))
  }
  const clickSearchQuery = (keyword) => { //keyword history 저장 검색결과 요청
    dispatch(setSearchKeywordHistoryAction(keyword))
    dispatch(setSearchKeywordAction(keyword))
  }
  return (
    <div>
      <input type='text' value={autoCompleteKeyword} onChange={changeSearchValue} />
      <button onClick={() => clickSearchQuery(autoCompleteKeyword)}>검색</button>
      <div>{autoCompleteKeyword}</div>
    </div>
  )
};

export default SearchBar;

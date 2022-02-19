import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import searchKeyword, { setSearchKeywordAction, setAutoCompleteKeywordAction, setSearchKeywordHistoryAction } from '../../../../stores/modules/searchKeyword';

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const { autoCompleteKeyword, searchResultData, searchKeyword } = useSelector(state => state.searchKeyword);

  const changeSearchValue = (e) => {
    dispatch(setAutoCompleteKeywordAction(e.target.value))
  }
  const clickSearchQuery = (keyword) => { //keyword history 저장 검색결과 요청
    dispatch(setSearchKeywordHistoryAction(keyword))
    dispatch(setSearchKeywordAction(keyword))
  }
  return (
    <div>
      <Input type='text' value={autoCompleteKeyword} onChange={changeSearchValue} />
      <button onClick={() => clickSearchQuery(autoCompleteKeyword)}>검색</button>

    </div>
  )
};

const Input = styled.input`
  width: 500px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: beige;
  box-sizing: border-box;
  font-size: 16px;
}
`
export default SearchBar;

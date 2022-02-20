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
  const resetSearchKeyword = () => {
    dispatch(setAutoCompleteKeywordAction(''))
  }
  return (
    <SearchBarBlock>
      <Input type='text' value={autoCompleteKeyword} onChange={changeSearchValue} />
      <Button onClick={() => resetSearchKeyword()}>X</Button>

    </SearchBarBlock>
  )
};
const SearchBarBlock = styled.div`   
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding:20px 0;
`
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: beige;
  box-sizing: border-box;
  font-size: 16px;
`
const Button = styled.button`    
  position: absolute;
  right: 10px;
  top:50%;
  transform: translateY(-50%);
`

export default SearchBar;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';
import { TiDelete } from 'react-icons/ti';
import searchKeyword, {
  setSearchKeywordAction,
  setAutoCompleteKeywordAction,
  setSearchKeywordHistoryAction,
} from '../../../../stores/modules/searchKeyword';

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const { autoCompleteKeyword, searchResultData, searchKeyword } = useSelector(
    (state) => state.searchKeyword
  );

  const changeSearchValue = (e) => {
    dispatch(setAutoCompleteKeywordAction(e.target.value));
  };
  const clickSearchQuery = (keyword) => {
    //keyword history 저장 검색결과 요청
    dispatch(setSearchKeywordHistoryAction(keyword));
    dispatch(setSearchKeywordAction(keyword));
  };
  const resetSearchKeyword = () => {
    dispatch(setAutoCompleteKeywordAction(''));
  };
  return (
    <SearchBarBlock>
      <Input
        type="text"
        value={autoCompleteKeyword || ''}
        placeholder="제품명을 입력해주세요"
        onChange={changeSearchValue}
      />
      <Button onClick={() => resetSearchKeyword()}>
        {autoCompleteKeyword.length !== 0 && (
          <TiDelete size={18} color={theme.color.gray4} />
        )}
      </Button>
    </SearchBarBlock>
  );
};
const SearchBarBlock = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background-color: ${theme.color.lightGray3};
  box-sizing: border-box;
  font-size: 16px;
`;
const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
`;

export default SearchBar;

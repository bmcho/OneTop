import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  setExcludeAutoCompleteKeywordAction,
  setIncludeAutoCompleteKeywordAction,
  setIngredientForSearchAction,
  clearIncludeAutoCompleteDataAction,
  clearExcludeAutoCompleteDataAction,
} from '../../../stores/modules/searchIngredient';
import SearchBlock from './searchBlock/SearchBlock';
import SearchIngredientResult from './searchIngredientResult/SearchIngredientResult';

const SearchIngredient = (props) => {
  const dispatch = useDispatch();
  const {
    includeAutoCompleteKeyword,
    excludeAutoCompleteKeyword,
    includeAutoCompleteData,
    excludeAutoCompleteData,
  } = useSelector((state) => state.searchIngredient);
  const [includeKeywords, setIncludeKeywords] = useState([]);
  const [excludeKeywords, setExcludeKeywords] = useState([]);
  const getResult = () => {
    const reqParam = {
      includeIngredient: includeKeywords,
      excludeIngredient: excludeKeywords,
      requestPage: 0,
      maxItemCountByPage: 10,
      sort: 'name asc',
    };
    console.log('request point', reqParam);
    dispatch(setIngredientForSearchAction(reqParam));
  };

  return (
    <SearchIngredientBlock>
      <SearchBlock
        inputTitle={'포함할 성분'}
        keywords={includeKeywords}
        setKeywords={setIncludeKeywords}
        setAutoKeywords={setIncludeAutoCompleteKeywordAction}
        autoCompleteKeyword={includeAutoCompleteKeyword}
        autoCompleteData={includeAutoCompleteData}
        clearAutoCompleteData={clearIncludeAutoCompleteDataAction}
      />
      <SearchBlock
        inputTitle={'제외할 성분'}
        keywords={excludeKeywords}
        setKeywords={setExcludeKeywords}
        setAutoKeywords={setExcludeAutoCompleteKeywordAction}
        autoCompleteKeyword={excludeAutoCompleteKeyword}
        autoCompleteData={excludeAutoCompleteData}
        clearAutoCompleteData={clearExcludeAutoCompleteDataAction}
      />
      <SearchButtonWrap>
        <SearchButton onClick={getResult}>검색</SearchButton>
      </SearchButtonWrap>
      <SearchIngredientResult />
    </SearchIngredientBlock>
  );
};

const SearchIngredientBlock = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const SearchButtonWrap = styled.div`
  text-align: center;
`;
const SearchButton = styled.button`
  background-color: ${(props) => props.theme.color.white};
  color: ${(props) => props.theme.color.black};
  padding: 10px 20px;
  border-radius: 2px;
  border: 2px solid ${(props) => props.theme.color.black};
  &:hover {
    border: none;
    background-color: ${(props) => props.theme.color.purple};
    color: ${(props) => props.theme.color.white};
    // font-weight:bold;
  }
`;
export default SearchIngredient;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  setExcludeAutoCompleteKeywordAction,
  setIncludeAutoCompleteKeywordAction,
  clearIncludeAutoCompleteDataAction,
  clearExcludeAutoCompleteDataAction,
  setIngredientInRequestParamsAction,
  setIncludeIngredientAction,
  setExcludeIngredientAction,
} from '../../../stores/modules/searchIngredient';
import SearchBlock from './searchBlock/SearchBlock';
import SearchIngredientResult from './searchIngredientResult/SearchIngredientResult';

const SearchIngredient = (props) => {
  const dispatch = useDispatch();
  const {
    resultRequestParams,
    includeAutoCompleteKeyword,
    excludeAutoCompleteKeyword,
    includeAutoCompleteData,
    excludeAutoCompleteData,
  } = useSelector((state) => state.searchIngredient);

  const setIncludeKeywords = (keyword) => {
    dispatch(setIncludeIngredientAction(keyword));
  };
  const setExcludeKeywords = (keyword) => {
    dispatch(setExcludeIngredientAction(keyword));
  };
  const getResult = () => {
    const ingredient = {
      requestPage: 0,
      sort: 'id desc',
    };
    dispatch(setIngredientInRequestParamsAction(ingredient));
  };

  return (
    <SearchIngredientBlock>
      <Description>
        키워드 자동완성을 이용해 성분을 검색해 보세요 (스쿠알란, 녹차, 적색...)
      </Description>
      <SearchBlock
        inputTitle={'포함할 성분'}
        keywords={resultRequestParams.includeIngredient}
        setKeywords={setIncludeKeywords}
        setAutoKeywords={setIncludeAutoCompleteKeywordAction}
        autoCompleteKeyword={includeAutoCompleteKeyword}
        autoCompleteData={includeAutoCompleteData}
        clearAutoCompleteData={clearIncludeAutoCompleteDataAction}
      />
      <SearchBlock
        inputTitle={'제외할 성분'}
        keywords={resultRequestParams.excludeIngredient}
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
const Description = styled.p`
  padding-top: 30px;
  text-align: center;
  color: ${(props) => props.theme.color.gray5};
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
  &:focus {
    border: 2px solid ${(props) => props.theme.color.black};
  }
  &:hover {
    border: 2px solid ${(props) => props.theme.color.purple};
    background-color: ${(props) => props.theme.color.purple};
    color: ${(props) => props.theme.color.white};
    // font-weight:bold;
  }
`;
export default SearchIngredient;

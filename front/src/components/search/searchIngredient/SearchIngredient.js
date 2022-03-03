import React from 'react';
import styled from 'styled-components';
import SearchBar from './searchBar/SearchBar';

const SearchIngredient = (props) => (
  <SearchIngredientBlock>
    <SearchBar inputTitle={'포함할 성분'} />
    <SearchBar inputTitle={'제외할 성분'} />
    <SearchButtonWrap>
      <SearchButton>검색</SearchButton>
    </SearchButtonWrap>
  </SearchIngredientBlock>
);

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

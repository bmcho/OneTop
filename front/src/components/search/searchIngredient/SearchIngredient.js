import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResultItem from '../searchResultItem/SearchResultItem';
import SearchBar from './searchBar/SearchBar';

const SearchIngredient = (props) => {
  const [includeKeywords, setIncludeKeywords] = useState([]);
  const [excludeKeywords, setExcludeKeywords] = useState([]);
  const [resultData, setResultData] = useState([]);
  const getResult = async () => {
    const reqParam = {
      includeIngredient: includeKeywords,
      excludeIngredient: excludeKeywords,
      requestPage: 0,
      maxItemCountByPage: 10,
    };
    await axios
      .post('http://localhost/api/search/ingredient', reqParam)
      .then((res) => {
        console.log(res.data);
        setResultData(res.data.result);
      });
  };
  return (
    <SearchIngredientBlock>
      <SearchBar
        inputTitle={'포함할 성분'}
        keywords={includeKeywords}
        setKeywords={setIncludeKeywords}
      />
      <SearchBar
        inputTitle={'제외할 성분'}
        keywords={excludeKeywords}
        setKeywords={setExcludeKeywords}
      />
      <SearchButtonWrap>
        <SearchButton onClick={getResult}>검색</SearchButton>
      </SearchButtonWrap>
      {resultData.length > 0 &&
        resultData.map((cosmetic, idx) => (
          <SearchResultItem key={idx} cosmetic={cosmetic} />
        ))}
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

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import AutoComplete from './autoComplete/AutoComplete';
// import SearchBar from './searchBar/SearchBar';
import SearchHistory from './searchHistory/SearchHistory';
import SearchResult from './searchResult/SearchResult';
import styled from 'styled-components';
import {
  setAutoCompleteKeywordAction,
  setSearchKeywordAction,
} from '../../../stores/modules/searchKeyword';
import SearchBar from '../searchKeyword/searchBar/SearchBar';

const SearchKeyword = (props) => {
  const dispatch = useDispatch();
  const [arrowKeyDir, setArrowKeyDir] = useState('down');
  const [selected, setSelected] = useState(-1);
  const { autoCompleteData, searchKeyword, autoCompleteKeyword } = useSelector(
    (state) => state.searchKeyword
  );
  const { loadingStatus } = useSelector((state) => state.loading);

  useEffect(() => {
    return () => {
      dispatch(setAutoCompleteKeywordAction(''));
      dispatch(setSearchKeywordAction(''));
    };
  }, []);

  useEffect(() => {
    console.log(loadingStatus);
  }, [loadingStatus]);
  const handleArrowKey = (key) => {
    console.log(key);
    setArrowKeyDir(key);
    if (autoCompleteData.length !== 0) {
      if (key === 'down' && autoCompleteData.length - 1 > selected) {
        setSelected((cur) => cur + 1);
      }
      if (key === 'up' && selected >= 0) {
        setSelected((cur) => cur - 1);
      }
    }
  };
  return (
    <SearchKeywordBlock>
      <SearchBar />
      {/* <SearchBar handleArrowKey={handleArrowKey} setSelected={setSelected} />
      {autoCompleteData.length !== 0 && (
        <AutoComplete arrowKeyDir={arrowKeyDir} selected={selected} />
      )} */}
      {searchKeyword.length !== 0 && <SearchResult />}
      {autoCompleteKeyword.length === 0 && searchKeyword.length === 0 && (
        <SearchHistory />
      )}
    </SearchKeywordBlock>
  );
};
const SearchKeywordBlock = styled.div`
  width: 80%;
  margin: 0 auto;
`;
export default SearchKeyword;

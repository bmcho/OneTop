import React, { useEffect, useRef } from 'react';
import AutoComplete from './autoComplete/AutoComplete';
import SearchInput from './searchInput/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchKeywordAction,
  setAutoCompleteKeywordAction,
} from '../../../../stores/modules/searchKeyword';
const SearchBar = (props) => {
  const inputRef = useRef();
  const resultsRef = useRef();

  const dispatch = useDispatch();
  const { autoCompleteData, autoCompleteKeyword, searchResultData } =
    useSelector((state) => state.searchKeyword);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (autoCompleteData.length > 0) {
      document.body.addEventListener('keydown', onKeyDown);
    } else {
      document.body.removeEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.removeEventListener('keydown', onKeyDown);
    };
  }, [autoCompleteData]);

  const onKeyDown = (event) => {
    if (resultsRef.current) {
      const resultsItems = Array.from(resultsRef.current.children);
      const activeResultIndex = resultsItems.findIndex((child) => {
        return child.querySelector('button') === document.activeElement;
      });

      if (event.key === 'ArrowUp') {
        if (document.activeElement === inputRef.current) {
          resultsItems[resultsItems.length - 1].querySelector('button').focus();
        } else if (resultsItems[activeResultIndex - 1]) {
          resultsItems[activeResultIndex - 1].querySelector('button').focus();
        } else {
          inputRef.current.focus();
        }
      }

      if (event.key === 'ArrowDown') {
        if (document.activeElement === inputRef.current) {
          resultsItems[0].querySelector('button').focus();
        } else if (resultsItems[activeResultIndex + 1]) {
          resultsItems[activeResultIndex + 1].querySelector('button').focus();
        } else {
          inputRef.current.focus();
        }
      }
    }
  };
  const changeSearchValue = (e) => {
    dispatch(setAutoCompleteKeywordAction(e.currentTarget.value));
    dispatch(setSearchKeywordAction(''));
  };

  const resetSearchKeyword = () => {
    dispatch(setAutoCompleteKeywordAction(''));
    dispatch(setSearchKeywordAction(''));
  };

  const requestSearchResult = (keyword) => {
    //keyword history 저장, 검색결과 요청
    dispatch(setSearchKeywordAction(keyword));
    setSearchHistoryInLocal(keyword);
    dispatch(setAutoCompleteKeywordAction(keyword));
  };

  const setSearchHistoryInLocal = (newKeyword) => {
    const keywords = JSON.parse(localStorage.getItem('keywords')) || [];
    keywords.push(newKeyword);
    localStorage.setItem('keywords', JSON.stringify(keywords));
  };

  return (
    <div>
      <SearchInput
        inputRef={inputRef}
        autoCompleteKeyword={autoCompleteKeyword}
        changeSearchValue={changeSearchValue}
        requestSearchResult={requestSearchResult}
        resetSearchKeyword={resetSearchKeyword}
      />
      <AutoComplete
        resultsRef={resultsRef}
        autoCompleteData={autoCompleteData}
        searchResultData={searchResultData}
        requestSearchResult={requestSearchResult}
      />
    </div>
  );
};

export default SearchBar;

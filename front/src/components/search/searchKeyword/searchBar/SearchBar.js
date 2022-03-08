import React, { useEffect, useRef } from 'react';
import AutoComplete from './autoComplete/AutoComplete';
import SearchInput from './searchInput/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchKeywordAction,
  setAutoCompleteKeywordAction,
  clearAutoCompleteDataAction,
  setRequestPageAction,
  setRequestDataAction,
  setResultTypeAction,
  setSortAction,
} from '../../../../stores/modules/searchKeyword';
const SearchBar = (props) => {
  const inputRef = useRef();
  const resultsRef = useRef();

  const dispatch = useDispatch();
  const { autoCompleteData, autoCompleteKeyword, searchKeyword } = useSelector(
    (state) => state.searchKeyword
  );

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
    if (event.isComposing) return;
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
    const keyword = e.currentTarget.value;
    if (searchKeyword.length > autoCompleteKeyword.length) {
      dispatch(setSearchKeywordAction(''));
    } else if (keyword.length === 0) {
      dispatch(clearAutoCompleteDataAction());
      dispatch(setAutoCompleteKeywordAction(''));
    } else {
      dispatch(setAutoCompleteKeywordAction(keyword));
    }
  };

  const resetSearchKeyword = () => {
    dispatch(setAutoCompleteKeywordAction(''));
    dispatch(setSearchKeywordAction(''));
    dispatch(clearAutoCompleteDataAction());
  };

  const requestSearchResult = (keyword, type = 'product') => {
    //keyword history 저장, 검색결과 요청
    const requestPage = 0;
    const sort = 'name asc';
    dispatch(setRequestPageAction(requestPage));
    dispatch(setSearchKeywordAction(keyword));
    dispatch(setResultTypeAction(type));
    dispatch(setSortAction(sort));

    dispatch(
      setRequestDataAction({
        requestPage: requestPage,
        sort: sort,
        searchResultType: type,
        keyword: keyword,
      })
    );
    setSearchHistoryInLocal(keyword);
    dispatch(setAutoCompleteKeywordAction(keyword));
  };

  const setSearchHistoryInLocal = (newKeyword) => {
    const keywords = JSON.parse(localStorage.getItem('keywords')) || [];
    if (!keywords.includes(newKeyword)) {
      keywords.unshift(newKeyword);
      localStorage.setItem('keywords', JSON.stringify(keywords));
    } else {
      const idx = keywords.findIndex((keyword) => keyword === newKeyword);
      keywords.splice(idx, 1);
      keywords.unshift(newKeyword);
      localStorage.setItem('keywords', JSON.stringify(keywords));
    }
  };

  return (
    <div>
      <SearchInput
        inputRef={inputRef}
        autoCompleteKeyword={autoCompleteKeyword}
        changeSearchValue={changeSearchValue}
        requestSearchResult={requestSearchResult}
        resetSearchKeyword={resetSearchKeyword}
        onKeyDown={onKeyDown}
      />
      <AutoComplete
        resultsRef={resultsRef}
        requestSearchResult={requestSearchResult}
      />
    </div>
  );
};

export default SearchBar;

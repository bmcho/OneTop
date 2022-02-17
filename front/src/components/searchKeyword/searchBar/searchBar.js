import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchKeywordAction } from '../../../stores/modules/searchKeyword';

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const { searchKeyword, searchResultData } = useSelector(state => state.searchKeyword);

  const changeSearchValue = (e) => {

    dispatch(setSearchKeywordAction(e.target.value))

  }

  return (
    <div>
      <input type='text' value={searchKeyword} onChange={changeSearchValue} />
      <div>{searchKeyword}</div>
      {searchResultData && (
        <div>
          {searchResultData.map(show => (
            <div key={show.id}>
              <a href={show.url}>{show.name}</a>
              <div>점수 : {show.score}</div>
              <div>타입 : {show.type}</div>
              <div>언어 : {show.language}</div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
};

export default SearchBar;

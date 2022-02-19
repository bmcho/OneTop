import React from 'react';
import { useSelector } from 'react-redux';

const SearchResult = (props) => {
  const { searchResultData } = useSelector(state => state.searchKeyword);
  return (
    <div>{searchResultData && (
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

export default SearchResult;

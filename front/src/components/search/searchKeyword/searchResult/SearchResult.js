import React from 'react';
import { useSelector } from 'react-redux';
import SearchResultItem from '../../searchResultItem/SearchResultItem';

const SearchResult = (props) => {
  const { searchResultData } = useSelector(state => state.searchKeyword);
  return (
    <div>{searchResultData && (
      <div>
        {searchResultData.map((show, idx) => (
          <SearchResultItem key={idx} show={show} />
        ))}
      </div>
    )}
    </div>
  )
};

export default SearchResult;

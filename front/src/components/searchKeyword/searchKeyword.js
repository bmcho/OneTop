import React from 'react';
import AutoComplete from './autoComplete/autoComplete';
import SearchBar from './searchBar/searchBar';
import SearchResult from './searchResult/searchResult';

const SearchKeyword = (props) => {

  return (
    <div>
      <div>searchKeyword</div>

      <SearchBar />
      <AutoComplete />
      <SearchResult />
    </div>
  )
};

export default SearchKeyword;

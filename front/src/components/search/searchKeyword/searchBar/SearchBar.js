import React from 'react';
import AutoComplete from './autoComplete/AutoComplete';
import SearchInput from './searchInput/SearchInput';

const SearchBar = (props) => {
  return (
    <div>
      <SearchInput />
      <AutoComplete />
    </div>
  );
};

export default SearchBar;

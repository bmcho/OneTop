import React from 'react';
import SearchBar from './searchBar/searchBar';

const SearchIngredient = (props) => (
  <div>
    <SearchBar inputTitle={'포함할 성분'} />
    <SearchBar inputTitle={'제외할 성분'} />
  </div>
);

export default SearchIngredient;

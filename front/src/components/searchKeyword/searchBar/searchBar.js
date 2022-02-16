import React, { useState } from 'react';
import search from '../../../../pages/search';

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const changeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }
  return (
    <div>
      <input type='text' value={searchValue} onChange={changeSearchValue} />
      <div>{searchValue}</div>
    </div>
  )
};

export default SearchBar;

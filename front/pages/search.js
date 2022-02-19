import React from 'react';
import SearchIngredient from '../src/components/searchIngredient/searchIngredient';
import SearchKeyword from '../src/components/searchKeyword/searchKeyword';

const search = (props) => (
  <div>
    <div>search page</div>
    <SearchKeyword />
    <SearchIngredient />
  </div>
);

export default search;

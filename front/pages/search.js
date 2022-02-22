import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchIngredient from '../src/components/search/searchIngredient/SearchIngredient';
import SearchKeyword from '../src/components/search/searchKeyword/SearchKeyword';
import SearchTypeTap from '../src/components/search/searchTypeTap/SearchTypeTap';
import SearchFromCategory from '../src/components/search/searchCategory/SearchFromCategory';

const search = (props) => {
  const { tapState } = useSelector((state) => state.searchTypeTap);
  const renderSearch = useMemo(() => {
    if (tapState === 'category') {
      return <SearchFromCategory />;
    } else if (tapState === 'keyword') {
      return <SearchKeyword />;
    } else {
      return <SearchIngredient />;
    }
  }, [tapState]);

  return (
    <SearchPageBlock>
      <SearchTypeTap />
      {renderSearch}
    </SearchPageBlock>
  );
};

const SearchPageBlock = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;
export default search;

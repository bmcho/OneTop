import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchResultItem from '../../searchResultItem/SearchResultItem';

const SearchIngredientResult = (props) => {
  const { loadingStatus } = useSelector((state) => state.loading);
  const { searchIngredientResultData } = useSelector(
    (state) => state.searchIngredient
  );
  useEffect(() => {
    console.log('loadingStatus', loadingStatus);
  }, [loadingStatus]);
  if (loadingStatus) return <div>loading</div>;

  return (
    <div>
      {searchIngredientResultData.length === 0 ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <div>
          {searchIngredientResultData.map((cosmetic, idx) => (
            <SearchResultItem key={idx} cosmetic={cosmetic} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchIngredientResult;

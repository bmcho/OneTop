import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchResultItem from '../../searchResultItem/SearchResultItem';

const SearchResult = (props) => {
  const { searchResultData, searchKeyword, autoCompleteKeyword } = useSelector(
    (state) => state.searchKeyword
  );
  const { loadingStatus } = useSelector((state) => state.loading);
  useEffect(() => {
    console.log('searchresult mounted');
    return () => console.log('searchresult unmounted');
  }, []);

  if (loadingStatus) return <div>loading</div>;
  return (
    <div>
      {searchKeyword.length !== 0 &&
        (searchResultData.length === 0 ? (
          <div>검색 결과가 없습니다</div>
        ) : (
          <div>
            {searchResultData.map((cosmetic, idx) => (
              <SearchResultItem key={idx} cosmetic={cosmetic} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default SearchResult;

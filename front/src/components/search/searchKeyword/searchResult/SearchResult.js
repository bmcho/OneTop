import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchResultItem from '../../searchResultItem/SearchResultItem';

const SearchResult = (props) => {
  const { searchResultData } = useSelector((state) => state.searchKeyword);
  const { loadingStatus } = useSelector((state) => state.loading);
  useEffect(() => {
    console.log('searchresult mounted');
    return () => console.log('searchresult unmounted');
  }, []);
  if (loadingStatus) return <div>loading</div>;
  return (
    <div>
      {searchResultData.length === 0 ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <div>
          {searchResultData.map((show, idx) => (
            <SearchResultItem key={idx} show={show} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;

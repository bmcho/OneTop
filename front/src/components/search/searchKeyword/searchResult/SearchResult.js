import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  setRequestDataAction,
  setRequestPageAction,
  setResultTypeAction,
} from '../../../../stores/modules/searchKeyword';
import Pagination from '../../../commons/pagination/Pagination';
import SearchResultItem from '../../searchResultItem/SearchResultItem';
import Tab from './tab/Tab';

const SearchResult = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    searchResultData,
    searchKeyword,
    autoCompleteKeyword,
    requestPage,
    resultTotalPage,
    resultType,
    sort,
  } = useSelector((state) => state.searchKeyword);
  const { loadingStatus } = useSelector((state) => state.loading);
  useEffect(() => {
    console.log('searchresult mounted');
    return () => console.log('searchresult unmounted');
  }, []);

  const LinkDetailPageHandle = (product_num) => {
    router.push({
      pathname: `/detail/${product_num}`,
    });
  };

  const setCurrentPage = (page) => {
    dispatch(setRequestPageAction(page));

    dispatch(
      setRequestDataAction({
        requestPage: page,
        sort: sort,
        searchResultType: resultType,
        keyword: searchKeyword,
      })
    );
  };

  if (loadingStatus) return <div>loading</div>;
  return (
    <div>
      <Tab resultType={resultType} />
      {searchKeyword.length !== 0 &&
        (searchResultData.length === 0 ? (
          <div>검색 결과가 없습니다</div>
        ) : (
          <div>
            <div>
              {searchResultData.map((cosmetic, idx) => (
                <a
                  key={cosmetic.product_num}
                  onClick={() => LinkDetailPageHandle(cosmetic.product_num)}
                >
                  <SearchResultItem cosmetic={cosmetic} />
                </a>
              ))}
            </div>
            <Pagination
              totalPage={resultTotalPage}
              currentPage={requestPage}
              setCurrentPage={setCurrentPage}
              countByStep={5}
            />
          </div>
        ))}
    </div>
  );
};
const TabItem = styled.div`
  background-color: ${(props) => props.active && 'red'};
`;
export default SearchResult;

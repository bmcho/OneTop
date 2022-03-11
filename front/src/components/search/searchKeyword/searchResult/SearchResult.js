import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../../../../styles/theme';
import {
  setRequestDataAction,
  setRequestPageAction,
  setResultTypeAction,
  setSortAction,
} from '../../../../stores/modules/searchKeyword';
import Loading from '../../../commons/loading/loading';
import NoResult from '../../../commons/noResult/NoResult';
import Pagination from '../../../commons/pagination/Pagination';
import ResultSort from '../../../commons/resultSort/ResultSort';
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

  const changeSort = (e) => {
    const newSort = e.target.value;
    dispatch(setSortAction(newSort));
    dispatch(setRequestPageAction(0));
    dispatch(
      setRequestDataAction({
        requestPage: 0,
        sort: newSort,
        searchResultType: resultType,
        keyword: searchKeyword,
      })
    );
  };

  if (loadingStatus) return <Loading />;
  return (
    <div>
      <TabSection>
        <Tab resultType={resultType} />
        <ResultSort onChange={changeSort} value={sort} />
      </TabSection>
      {searchKeyword.length !== 0 &&
        (searchResultData.length === 0 ? (
          <NoResult />
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
const TabSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
  ${media.mobile} {
    flex-direction: column;
    margin-left: 0;
    padding-left: 0;
    height: auto;
  }
`;
const Select = styled.select`
  height: 35px;
  background: white;
  color: ${(props) => props.theme.color.gray3};
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
  ${media.mobile} {
    width: 50%;
    padding: 10px 0;
    margin-top: 10px;
    align-self: flex-end;
  }
`;
const TabItem = styled.div`
  background-color: ${(props) => props.active && 'red'};
`;
export default SearchResult;

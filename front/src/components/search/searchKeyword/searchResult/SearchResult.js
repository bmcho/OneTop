import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  setRequestDataAction,
  setRequestPageAction,
  setResultTypeAction,
  setSortAction,
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

  if (loadingStatus) return <div>loading</div>;
  return (
    <div>
      <TabSection>
        <Tab resultType={resultType} />
        <Select onChange={changeSort} value={sort}>
          <option value="name asc">가나다 오름차순</option>
          <option value="name desc">가나다 내림차순</option>
          <option value="price asc">가격 낮은순</option>
          <option value="price desc">가격 높은순</option>
        </Select>
      </TabSection>
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
`;
const Select = styled.select`
  height: 35px;
  background: white;
  color: ${(props) => props.theme.color.gray3};
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
`;
const TabItem = styled.div`
  background-color: ${(props) => props.active && 'red'};
`;
export default SearchResult;

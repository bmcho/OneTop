import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  setPageInRequestParamsAction,
  setSortInRequestParamsAction,
} from '../../../../stores/modules/searchIngredient';
import Pagination from '../../../commons/pagination/Pagination';
import SearchResultItem from '../../searchResultItem/SearchResultItem';

const SearchIngredientResult = (props) => {
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector((state) => state.loading);
  const {
    resultRequestParams,
    searchIngredientResultData,
    searchIngredientResultTotalPage,
    searchIngredientResultCurrentPage,
  } = useSelector((state) => state.searchIngredient);
  useEffect(() => {
    console.log('loadingStatus', loadingStatus);
  }, [loadingStatus]);

  const setCurrentPage = (page) => {
    console.log(page);
    const curPage = {
      requestPage: page,
    };
    dispatch(setPageInRequestParamsAction(curPage));
  };

  const changeSort = (e) => {
    const newSort = { sort: e.target.value, requestPage: 0 };
    dispatch(setSortInRequestParamsAction(newSort));
  };

  if (loadingStatus) return <div>loading</div>;

  return (
    <div>
      <div>
        <Select onChange={changeSort} value={resultRequestParams.sort}>
          <option value="name asc">가나다 오름차순</option>
          <option value="name desc">가나다 내림차순</option>
          <option value="price asc">가격 낮은순</option>
          <option value="price desc">가격 높은순</option>
        </Select>
      </div>
      {searchIngredientResultData.length === 0 ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <div>
          <div>
            {searchIngredientResultData.map((cosmetic, idx) => (
              <SearchResultItem key={idx} cosmetic={cosmetic} />
            ))}
          </div>
          <Pagination
            totalPage={searchIngredientResultTotalPage}
            currentPage={searchIngredientResultCurrentPage}
            setCurrentPage={setCurrentPage}
            countByStep={5}
          />
        </div>
      )}
    </div>
  );
};
const Select = styled.select`
  height: 35px;
  background: white;
  color: ${(props) => props.theme.color.gray3};
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
`;
export default SearchIngredientResult;

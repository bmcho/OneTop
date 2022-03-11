import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  setPageInRequestParamsAction,
  setSortInRequestParamsAction,
} from '../../../../stores/modules/searchIngredient';
import LoadingComponent from '../../../commons/loading/LoadingComponent';
import NoResult from '../../../commons/noResult/NoResult';
import Pagination from '../../../commons/pagination/Pagination';
import ResultSort from '../../../commons/resultSort/ResultSort';
import SearchResultItem from '../../searchResultItem/SearchResultItem';

const SearchIngredientResult = (props) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { loadingStatus } = useSelector((state) => state.loading);
  const {
    resultRequestParams,
    searchIngredientResultData,
    searchIngredientResultTotalPage,
    searchIngredientResultCurrentPage,
  } = useSelector((state) => state.searchIngredient);

  const setCurrentPage = (page) => {
    const curPage = {
      requestPage: page,
    };
    dispatch(setPageInRequestParamsAction(curPage));
  };

  const changeSort = (e) => {
    const newSort = { sort: e.target.value, requestPage: 0 };
    dispatch(setSortInRequestParamsAction(newSort));
  };

  const LinkDetailPageHandle = (product_num) => {
    router.push({
      pathname: `/detail/${product_num}`,
    });
  };

  if (loadingStatus) return <LoadingComponent />;

  return (
    <ResultBlock>
      <SelectBlock>
        <ResultSort onChange={changeSort} value={resultRequestParams.sort} />
      </SelectBlock>
      {searchIngredientResultData.length === 0 ? (
        <NoResult />
      ) : (
        <div>
          <div>
            {searchIngredientResultData.map((cosmetic, idx) => (
              <a
                key={cosmetic.product_num}
                onClick={() => LinkDetailPageHandle(cosmetic.product_num)}
              >
                <SearchResultItem cosmetic={cosmetic} />
              </a>
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
    </ResultBlock>
  );
};

const ResultBlock = styled.div`
    padding-top: 20px;
}`;

const SelectBlock = styled.div`
  display: flex;
  justify-content: end;
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
export default SearchIngredientResult;

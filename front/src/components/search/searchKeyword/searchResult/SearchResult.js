import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRequestDataAction,
  setRequestPageAction,
} from '../../../../stores/modules/searchKeyword';
import Pagination from '../../../commons/pagination/Pagination';
import Pagenation from '../../searchCategory/Pagenation';
import SearchResultItem from '../../searchResultItem/SearchResultItem';

const SearchResult = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    searchResultData,
    searchKeyword,
    autoCompleteKeyword,
    requestPage,
    resultTotalPage,
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
    const sort = 'name asc';
    dispatch(setRequestPageAction(page));

    dispatch(
      setRequestDataAction({
        requestPage: page,
        sort: sort,
        keyword: searchKeyword,
      })
    );
  };
  if (loadingStatus) return <div>loading</div>;
  return (
    <div>
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
            {/* <Pagenation
              pathname={router.pathname}
              totalPage={resultTotalPage}
              itemPerPage={5}
              kind={{ keyword: searchKeyword }}
            /> */}
          </div>
        ))}
    </div>
  );
};

export default SearchResult;

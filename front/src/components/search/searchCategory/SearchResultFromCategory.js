import { useEffect, useState } from 'react';
import SearchFromCategory from './SearchFromCategory';
import { useSelector, useDispatch } from 'react-redux';
import SearchResultItem from '../../search/searchResultItem/SearchResultItem';
import { getProductInfoByCategoryAction } from '../../../stores/modules/searchCategory';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdChevronLeft } from 'react-icons/md';
import { hashtagSplit } from '../../../utils/util';
import LoadingComponent from '../../commons/loading/LoadingComponent';
import Error from 'next/error';
import NoResult from '../../commons/noResult/NoResult';

const SearchResultFromCategory = ({
  largeCategory,
  smallCategory,
  itemPerPage,
  sortingStandard,
}) => {
  const {
    loading,
    data: productInfos,
    error,
  } = useSelector((state) => state.searchCategory);
  const dispatch = useDispatch();
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    if (page) {
      dispatch(
        getProductInfoByCategoryAction({
          requestPage: page - 1,
          maxItemCountByPage: itemPerPage,
          largeCategory,
          smallCategory,
          sort: sortingStandard,
        })
      );
    }
  }, [page, sortingStandard]);

  const LinkDetailPageHandle = (product_num) => {
    router.push({
      pathname: `/detail/${product_num}`,
    });
  };

  if (loading) return <LoadingComponent />;
  if (error) return <Error statusCode={500} title={'네트워크 에러'} />;
  if (!productInfos)
    return <Error statusCode={500} title={'상품이 존재하지 않습니다.'} />;

  return (
    <ResultBlock>
      {productInfos.length === 0 ? (
        <NoResult />
      ) : (
        <>
          <div size={itemPerPage}>
            {productInfos.result.map((cosmetic, idx) => {
              return (
                <a
                  key={idx}
                  onClick={() => LinkDetailPageHandle(cosmetic.product_num)}
                >
                  <SearchResultItem key={idx} cosmetic={cosmetic} />
                </a>
              );
            })}
          </div>
        </>
      )}
    </ResultBlock>
  );
};

const ResultBlock = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default SearchResultFromCategory;

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

const SearchResultFromCategory = ({
  largeCategory,
  smallCategory,
  itemPerPage,
  sortingStandard,
}) => {
  const { loading, data, error } = useSelector((state) => state.searchCategory);
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
  }, [page]);

  const LinkDetailPageHandle = (product_num) => {
    router.push({
      pathname: `/detail/${product_num}`,
    });
  };

  if (loading) return null;
  if (error) return <div>error...</div>;
  if (!data) return <div>error...</div>;

  return (
    <ResultBlock>
      {data.length === 0 ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <>
          <div size={itemPerPage}>
            {data.result.map((cosmetic, idx) => {
              console.log(hashtagSplit(cosmetic.hashtag));
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

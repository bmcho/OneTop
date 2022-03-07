import { useEffect, useState } from 'react';
import SearchFromCategory from './SearchFromCategory';
import { useSelector, useDispatch } from 'react-redux';
import SearchResultItem from '../../search/searchResultItem/SearchResultItem';
import { getProductInfoByCategoryAction } from '../../../stores/modules/searchCategory';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SearchResultFromCategory = ({
  largeCategory,
  smallCategory,
  resetCategory,
  nowPage,
  setNowPage,
  itemPerPage,
}) => {
  const { loading, data, error } = useSelector((state) => state.searchCategory);
  const dispatch = useDispatch();
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    if (data?.currentPage === nowPage - 1) return;
    dispatch(
      getProductInfoByCategoryAction({
        requestPage: nowPage - 1,
        maxItemCountByPage: itemPerPage,
        largeCategory,
        smallCategory,
      })
    );
  }, [nowPage]);

  useEffect(() => {
    if (page) {
      setNowPage(parseInt(page));
    }
  }, [page]);

  const NextPageHandle = (pageNum) => {
    router.push({
      pathname: router.pathname,
      query: {
        largeCategory,
        smallCategory,
        page: pageNum,
      },
    });
  };

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
      <button onClick={resetCategory}>뒤로</button>
      {data.length === 0 ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <>
          <div size={itemPerPage}>
            {data.result.map((cosmetic, idx) => (
              <a
                key={idx}
                onClick={() => LinkDetailPageHandle(cosmetic.product_num)}
              >
                <SearchResultItem key={idx} cosmetic={cosmetic} />
              </a>
            ))}
          </div>
        </>
      )}
    </ResultBlock>
  );
};

const ResultBlock = styled.div`
  padding: 30px 0;
  width: 80%;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  button {
    font-size: 18px;
    text-align: center;
    line-height: 20px;
    padding: 20px;
    border-radius: 10px;
  }

  button:hover {
    background-color: ${({ theme }) => theme.color.yellow2};
  }
`;

export default SearchResultFromCategory;

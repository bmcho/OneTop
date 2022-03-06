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
}) => {
  const { loading, data, error } = useSelector((state) => state.searchCategory);
  const dispatch = useDispatch();
  const router = useRouter();
  const [nowPage, setNowPage] = useState(1);
  const itemPerPage = 5;

  useEffect(() => {
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
    const { page } = router.query;
    if (page) {
      setNowPage(parseInt(page));
    }
  }, [router.query.page]);

  const NextPageHandle = (pageNum) => {
    setNowPage(pageNum);
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

  const NextPagenateHandle = (end) => {
    NextPageHandle(end + 1);
  };

  const PrevPagenateHandle = (start) => {
    NextPageHandle(start);
  };

  if (loading) return null;
  if (error) return <div>error...</div>;
  if (!data) return <div>error...</div>;

  const startPageNum = parseInt((nowPage - 1) / itemPerPage) * itemPerPage;
  const endPageNum =
    startPageNum + itemPerPage > data.totalPageCount + 1
      ? data.totalPageCount + 1
      : startPageNum + itemPerPage;
  const isNext = endPageNum < data.totalPageCount + 1;
  const isPrev = startPageNum >= 1;

  return (
    <ResultBlock>
      <button onClick={resetCategory}>뒤로</button>
      {data.length === 0 ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <>
          <div>
            {data.result.map((cosmetic, idx) => (
              <a onClick={() => LinkDetailPageHandle(cosmetic.product_num)}>
                <SearchResultItem key={idx} cosmetic={cosmetic} />
              </a>
            ))}
          </div>
          <ButtonWrapper>
            {isPrev && (
              <button onClick={() => PrevPagenateHandle(startPageNum)}>
                이전
              </button>
            )}
            {new Array(endPageNum - startPageNum).fill(0).map((_, idx) => {
              return (
                <button onClick={() => NextPageHandle(startPageNum + idx + 1)}>
                  {startPageNum + idx + 1}
                </button>
              );
            })}
            {isNext && (
              <button onClick={() => NextPagenateHandle(endPageNum)}>
                다음
              </button>
            )}
          </ButtonWrapper>
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

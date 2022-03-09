import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchResultItem from '../search/searchResultItem/SearchResultItem';
import { getRecommendedAction } from '../../stores/modules/productRecommend';
import Link from 'next/link';

const RecommendResult = () => {
  const { selectKeywords, recommended, category } = useSelector(
    (state) => state.productRecommend
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecommendedAction(category, selectKeywords));
  }, []);

  if (recommended.loading) return <div>loading</div>;
  if (!recommended?.data) return null;

  return (
    <ResultBlock>
      {recommended?.data.map((cosmetic) => {
        return (
          <ResultItems>
            <Link href={`/detail/${cosmetic.product_num}`}>
              <a>
                <SearchResultItem cosmetic={cosmetic} />
              </a>
            </Link>
          </ResultItems>
        );
      })}
    </ResultBlock>
  );
};

const ResultBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultItems = styled.ul`
  width: 50%;
`;

export default RecommendResult;

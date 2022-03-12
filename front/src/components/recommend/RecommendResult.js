import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchResultItem from '../search/searchResultItem/SearchResultItem';
import { getRecommendedAction } from '../../stores/modules/productRecommend';
import Link from 'next/link';
import { media } from '../../../styles/theme';
import LoadingComponent from '../commons/loading/LoadingComponent';

const RecommendResult = (props) => {
  const { selectKeywords, recommended, category } = useSelector(
    (state) => state.productRecommend
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommendedAction(category, selectKeywords));
  }, []);

  if (recommended.loading) return <LoadingComponent />;
  if (!recommended?.data) return null;

  return (
    <ResultBlock>
      {recommended?.data.map((cosmetic) => (
        <ResultItems key={cosmetic.product_num}>
          <Link href={`/detail/${cosmetic.product_num}`}>
            <ATag>
              <SearchResultItem cosmetic={cosmetic} />
            </ATag>
          </Link>
        </ResultItems>
      ))}
    </ResultBlock>
  );
};

const ResultBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 100px;
  box-sizing: border-box;
  ${media.mobile} {
    flex-direction: column;
  }
`;

const ResultItems = styled.div`
  width: 50%;
  ${media.mobile} {
    width: 100%;
  }
`;
const ATag = styled.a`
  text-decoration: none;
`;

export default RecommendResult;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchResultItem from '../search/searchResultItem/SearchResultItem';
import { getRecommendedAction } from '../../stores/modules/productRecommend';
import Link from 'next/link';
import { media } from '../../../styles/theme';

const RecommendResult = (props) => {
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
              <ATag>
                <SearchResultItem cosmetic={cosmetic} />
              </ATag>
            </Link>
          </ResultItems>
        );
      })}
    </ResultBlock>
  );
};

const ResultBlock = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  ${media.mobile} {
    flex-direction: column;
  }
`;
const ATag = styled.a`
  text-decoration: none;
`;
const ResultItems = styled.li`
  width: 50%;
`;

export default RecommendResult;

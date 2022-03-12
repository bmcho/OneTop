import React from 'react';
import styled from 'styled-components';
import { hashtagSplit, priceToString } from '../../../utils/util';
import Hashtag from '../../commons/hashtag/Hashtag';
import StarRating from '../../commons/starRating/StarRating';
const SearchResultItem = ({ cosmetic }) => (
  <SearchResultItemBlock>
    <ImageWrap>
      <img src={cosmetic.img_url} width={60} height={60} />
    </ImageWrap>
    <div>
      {cosmetic.keywords ? (
        <HashtagLIst>
          {hashtagSplit(cosmetic.keywords).map(
            (e, i) => i < 3 && <Hashtag key={`${e}${i}`}>{e}</Hashtag>
          )}
        </HashtagLIst>
      ) : (
        <HashtagLIst>
          {hashtagSplit(cosmetic.hashtag).map(
            (e, i) => i < 3 && <Hashtag key={`${e}${i}`}>{e}</Hashtag>
          )}
        </HashtagLIst>
      )}
      <Description>{cosmetic.brand}</Description>
      <Name>{cosmetic.name}</Name>
      <StarRating rating={cosmetic.average_rating} />
      <SubSection>
        <Description>{priceToString(cosmetic.price)}</Description>
        <Description>{cosmetic.capacity}</Description>
      </SubSection>
    </div>
  </SearchResultItemBlock>
);
const SearchResultItemBlock = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray3};
  cursor: pointer;
`;
const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
`;

const Description = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => props.theme.color.gray2};
  margin: 4px 0;
`;
const Name = styled.p`
  margin-bottom: 4px;
`;
const HashtagLIst = styled.ul`
  margin: 14px 0 10px 0;
`;
const SubSection = styled.div`
  display: flex;
  flex-direction: row;
  p + p {
    margin-left: 10px;
  }
`;
export default SearchResultItem;

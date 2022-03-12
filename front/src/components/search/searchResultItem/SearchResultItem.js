import React from 'react';
import styled from 'styled-components';
import { hashtagSplit, priceToString } from '../../../utils/util';
import Hashtag from '../../commons/hashtag/Hashtag';
import StarRating from '../../commons/starRating/StarRating';
//  {
//   product_num: 154564,
//   name: '(2022 시어 포 굿 에디션) 시어 버터 드라이 스킨 핸드 크림',
//   img_url:
//     'https://dn5hzapyfrpio.cloudfront.net/product/982/9822fd80-88b9-11ec-997a-63a0b2ea7234.jpeg?w=456',
//   brand: '록시땅',
//   average_rating: 0,
//   capacity: '30ml',
//   price: 14000,
//   keywords: null,
//   hashtag: "['#보습', '#저자극', '#피부탄력']",
// }
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

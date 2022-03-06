import React from 'react';
import styled from 'styled-components';
import StarRating from '../../commons/starRating/StarRating';
import Image from 'next/image';

const SearchResultItem = ({ cosmetic }) => (
  <SearchResultItemBlock>
    <ImageWrap>
      <Image src={cosmetic.img_url} width={60} height={60} />
    </ImageWrap>
    <div>
      <Description>이니스프리</Description>
      <p>{cosmetic.name}</p>
      <p>브랜드 : {cosmetic.brand}</p>
      <p>평점 : {cosmetic.average_rating}</p>
      {/* <p>{cosmetic.score * 10}</p> */}
      <StarRating rating={(cosmetic.average_rating * 10).toPrecision(2)} />
      {/* <Description>{cosmetic.language}</Description> */}
    </div>
  </SearchResultItemBlock>
);
const SearchResultItemBlock = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray3};
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
  margin-bottom: 4px;
`;
export default SearchResultItem;

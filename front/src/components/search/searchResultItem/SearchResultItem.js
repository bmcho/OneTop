import React from 'react';
import styled from 'styled-components';
import StarRating from '../../commons/starRating/StarRating';

const SearchResultItem = ({ cosmetic }) => (
  <SearchResultItemBlock>
    <ImageWrap>
      <img src="/images/product.jpeg" width={60} height={60} />
    </ImageWrap>
    <div>
      <Description>{cosmetic.brand}</Description>
      <Name>{cosmetic.name}</Name>
      <StarRating rating={cosmetic.average_rating} />
      <Description>{cosmetic.price}</Description>
    </div>
  </SearchResultItemBlock>
);
const SearchResultItemBlock = styled.li`
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
const Name = styled.p`
  margin-bottom: 4px;
`;
export default SearchResultItem;

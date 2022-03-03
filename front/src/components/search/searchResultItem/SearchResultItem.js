import React from 'react';
import styled from 'styled-components';
import StarRating from '../../commons/starRating/StarRating';

const SearchResultItem = ({ show }) => (
  <SearchResultItemBlock>
    <ImageWrap>
      <img src="/images/product.jpeg" width={60} height={60} />
    </ImageWrap>
    <div>
      <Description>이니스프리</Description>
      <p>{show.name}</p>
      <p>타입 : {show.type}</p>
      <p>언어 : {show.score}</p>
      <p>{show.score * 10}</p>
      <StarRating rating={(show.score * 10).toPrecision(2)} />
      <Description>{show.language}</Description>
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

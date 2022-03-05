import React from 'react';
import styled from 'styled-components';

const ProductItem = (props) => (
  <SearchResultItemBlock>
    <ImageWrap>
      <img src="/images/product.jpeg" width={60} height={60} />
    </ImageWrap>
    <div>
      <Description>이니스프리</Description>
      <Description>크림</Description>
    </div>
  </SearchResultItemBlock>
);
const SearchResultItemBlock = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray3};

  align-items: center;
  height: 100%;
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
export default ProductItem;

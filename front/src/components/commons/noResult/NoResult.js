import React from 'react';
import styled from 'styled-components';
import { ImNotification } from 'react-icons/im';

const NoResult = (props) => (
  <Block>
    <ImNotification />
    <Text>검색 결과가 없습니다</Text>
  </Block>
);

const Block = styled.div`
  text-align: center;
  color: ${(props) => props.theme.color.gray4};
  margin-top: 50px;
`;
const Text = styled.p`
  padding: 10px 0;
`;
export default NoResult;

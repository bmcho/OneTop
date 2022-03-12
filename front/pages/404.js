import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <Block>
      <Title>404</Title>
      <Sub>요청하진 페이지가 존재하지 않습니다</Sub>
      <p>잘못된 경로를 이용하셨습니다:)</p>
    </Block>
  );
};
const Block = styled.div`
  text-align: center;
`;
const Title = styled.h1`
  font-size: 100px;
`;
const Sub = styled.p`
  font-size: 20px;
  padding: 20px 0;
`;
export default NotFound;

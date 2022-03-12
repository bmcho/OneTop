import React from 'react';
import styled from 'styled-components';
import Animation from './Animation';

const Main = (props) => (
  <MainBlock>
    <Animation />
  </MainBlock>
);
const MainBlock = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  height: 600vh;
  // position: fixed;
`;
export default Main;

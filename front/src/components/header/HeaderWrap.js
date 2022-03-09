import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useScroll } from '../../hooks/scroll/useScroll';

const HeaderWrap = ({ children }) => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [activeColor, setActiveColor] = useState(false);
  useEffect(() => {
    if (window.innerHeight * 5 < scrollY) {
      setActiveColor(true);
    } else {
      setActiveColor(false);
    }
  }, [scrollY]);

  return (
    <HeaderBlock path={router.pathname} activeColor={activeColor}>
      {children}
    </HeaderBlock>
  );
};

const HeaderBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100px;
  padding: 20px;
  box-sizing: border-box;

  // position: fixed;
  background-color: ${(props) => props.activeColor && props.theme.color.white};
  z-index: 10;
  ${(props) => {
    if (props.path === '/') {
      return css`
        position: fixed;
      `;
    }
  }}
`;
export default HeaderWrap;

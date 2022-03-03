import Link from 'next/link';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

const Header = ({ path }) => {
  const router = useRouter();
  useEffect(() => {
    console.log(router);
  }, []);
  return (
    <HeaderBlock path={router.pathname}>
      <HeaderItemWrap>
        <Link href="/">
          <a>TITLE</a>
        </Link>
        <NavBlock>
          <li>
            <Link href="/search">
              <a>search</a>
            </Link>
          </li>
          <li>
            <Link href="/recommend">
              <a>recommend</a>
            </Link>
          </li>
        </NavBlock>
      </HeaderItemWrap>
    </HeaderBlock>
  );
};

Header.getInitialProps = async ({ query }) => {
  const { id } = query;

  return { path: id };
};
const HeaderBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100px;
  padding: 20px;
  box-sizing: border-box;

  position: fixed;
  z-index: 10;
  ${(props) => {
    if (props.path === '/') {
      return css`
        position: fixed;
      `;
    }
  }}
`;
const HeaderItemWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1024px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
const NavBlock = styled.nav`
  display: flex;
  li + li {
    padding-left: 10px;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;
export default Header;

import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import HeaderWrap from './HeaderWrap';

const Header = (props) => {
  return (
    <HeaderWrap>
      <HeaderItemWrap>
        <Link href="/">
          <a>
            <Logo src="/images/logo.png" />
          </a>
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
    </HeaderWrap>
  );
};

const HeaderItemWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 1024px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
const NavBlock = styled.nav`
  display: flex;
  padding-left: 20px;
  li + li {
    padding-left: 10px;
  }
  a {
    text-decoration: none;
    color: black;
    font-size: 20px;
    cursor: pointer;
  }
`;
export default Header;

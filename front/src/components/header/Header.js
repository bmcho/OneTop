import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Header = (props) => (
  <HeaderBlock>
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
  </HeaderBlock>
);
const HeaderBlock = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  height: 100px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

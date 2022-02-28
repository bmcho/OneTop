import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Header = (props) => (
  <HeaderBlock>
    <h1>Title</h1>
    <NavBlock>
      <li>
        <Link href="/search">
          <a>search</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>recommend</a>
        </Link>
      </li>
      <li>
        <Link href="/description">
          <a>description</a>
        </Link>
      </li>
    </NavBlock>
  </HeaderBlock>
);
const HeaderBlock = styled.div`
<<<<<<< HEAD:front/src/components/header/Header.js
  max-width: 1024px;
=======
  width: 1024px;
>>>>>>> feature_front_detail:front/src/components/header/header.js
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

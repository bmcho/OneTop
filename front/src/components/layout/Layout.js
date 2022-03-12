import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../../styles/globalStyle';
import { theme } from '../../../styles/theme';
import Header from '../header/Header';

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Header />
      <div>{children}</div>
    </ThemeProvider>
  </>
);

export default Layout;

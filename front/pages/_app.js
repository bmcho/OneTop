// import '../styles/globals.css'
import wrapper from '../src/stores';
import withReduxSaga from 'next-redux-saga'; // next와 redux-saga를 연결하기 위한 라이브러리
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/globalStyle';
import Header from '../src/components/header/header';
import Layout from '../src/components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(withReduxSaga(MyApp));

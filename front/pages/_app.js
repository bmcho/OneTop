import '../styles/globals.css'
import wrapper from '../src/stores';
import withReduxSaga from 'next-redux-saga'; // next와 redux-saga를 연결하기 위한 라이브러리

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(withReduxSaga(MyApp));

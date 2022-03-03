import wrapper from '../src/stores';
import withReduxSaga from 'next-redux-saga';
import Layout from '../src/components/layout/Layout';
import ProductCompare from '../src/components/compareBox/ProductCompare';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ProductCompare />
    </Layout>
  );
}

export default wrapper.withRedux(withReduxSaga(MyApp));

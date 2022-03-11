import wrapper from '../src/stores';
import withReduxSaga from 'next-redux-saga';
import Layout from '../src/components/layout/Layout';
import ProductCompare from '../src/components/compareBox/ProductCompare';
import { useRouter } from 'next/router';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>reCco</title>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      </Head>
      <Layout>
        <Component {...pageProps} />
        {router.pathname !== '/' && <ProductCompare />}
      </Layout>
    </>
  );
}

export default wrapper.withRedux(withReduxSaga(MyApp));

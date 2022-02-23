import Image from 'next/image';
import wrapper from '../../src/stores';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { getProductInfoAction } from '../../src/stores/modules/productInfo';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

const Detail = (props) => {
  const router = useRouter();
  const { data, error } = useSelector((state) => state.productInfo);

  if (error) return <div>error...</div>;

  return <div>{data?.name}</div>;
};

export async function getStaticPaths() {
  const res = await axios.get('http://localhost:3004/item');
  const items = res.data;
  const paths = items.map((item) => ({ params: { id: item.id } }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const { id } = params;
      store.dispatch(getProductInfoAction(id));
      store.dispatch(END);

      await store.sagaTask.toPromise();
    }
);

export default Detail;

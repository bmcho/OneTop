import Image from 'next/image';
import wrapper from '../../src/stores';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { getProductInfoAction } from '../../src/stores/modules/productInfo';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import ProductInfo from '../../src/components/detail/productInfo';
import IngredientInfo from '../../src/components/detail/IngredientInfo';
import { useCallback, useState } from 'react';

const Detail = (props) => {
  const router = useRouter();
  const { data, error } = useSelector((state) => state.productInfo);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpenHandle = useCallback(() => {
    setIsModalOpen((isopen) => !isopen);
  }, []);

  const addCompareBoxHandle = useCallback(() => {
    dispatch();
  }, []);

  if (error) return <div>error...</div>;

  const { img, hashTag, name, description, brand, capacity, price } = data;
  return (
    <DetailBlock>
      <ProductInfo
        img={img}
        hashTag={hashTag}
        name={name}
        description={description}
        brand={brand}
        capacity={capacity}
        price={price}
        modalOpenHandle={modalOpenHandle}
      />
      <IngredientInfo
        ingredients={data.ingredients}
        open={isModalOpen}
        modalOpenHandle={modalOpenHandle}
      />
    </DetailBlock>
  );
};

const DetailBlock = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export async function getStaticPaths() {
  try {
    const res = await axios.get('http://localhost:3004/item');
    const items = res.data;
    const paths = items.map((item) => ({ params: { id: item.id } }));
    return {
      paths,
      fallback: false,
    };
  } catch (e) {
    return {
      paths: [],
      fallback: false,
    };
  }
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

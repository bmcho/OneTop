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
import { addProductCompareInfoAction } from '../../src/stores/modules/productCompareInfo';

const Detail = (props) => {
  const router = useRouter();
  const { data: productInfo, error } = useSelector(
    (state) => state.productInfo
  );
  const { data: productCompareInfo } = useSelector(
    (state) => state.productCompareInfo
  );
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = router.query;

  const modalOpenHandle = useCallback(() => {
    setIsModalOpen((isopen) => !isopen);
  }, []);

  const addCompareBoxHandle = useCallback(() => {
    if (productCompareInfo.length >= 3) {
      alert('최대 3개까지 추가할수 있습니다.');
      return;
    }
    if (productCompareInfo.find((info) => info.id === id)) {
      alert('이미 추가된 제품입니다.');
      return;
    }
    dispatch(addProductCompareInfoAction(id));
  }, [productCompareInfo]);

  if (error) return <div>error...</div>;

  const { ingredients, ...rest } = productInfo;

  return (
    <DetailBlock>
      <ProductInfo
        {...rest}
        modalOpenHandle={modalOpenHandle}
        addCompareBoxHandle={addCompareBoxHandle}
      />
      <IngredientInfo
        ingredients={ingredients}
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

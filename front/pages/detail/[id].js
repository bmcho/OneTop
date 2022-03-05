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
import { useCallback, useEffect, useState } from 'react';
import { addProductCompareInfoAction } from '../../src/stores/modules/productCompareInfo';

const Detail = () => {
  const router = useRouter();
  const {
    loading,
    data: productInfo,
    error,
  } = useSelector((state) => state.productInfo);

  const { data: productCompareInfo } = useSelector(
    (state) => state.productCompareInfo
  );

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = router.query;

  useEffect(() => {
    dispatch(getProductInfoAction(id));
  }, [id]);

  const modalOpenHandle = useCallback(() => {
    setIsModalOpen((isopen) => !isopen);
  }, []);

  const addCompareBoxHandle = useCallback(() => {
    if (productCompareInfo.length >= 3) {
      alert('최대 3개까지 추가할수 있습니다.');
      return;
    }
    if (productCompareInfo.find((info) => info.product_num === parseInt(id))) {
      alert('이미 추가된 제품입니다.');
      return;
    }
    dispatch(addProductCompareInfoAction(id));
  }, [productCompareInfo, id]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!productInfo) return <div>error...</div>;

  const { ...rest } = productInfo;

  return (
    <DetailBlock>
      <ProductInfo
        {...rest}
        modalOpenHandle={modalOpenHandle}
        addCompareBoxHandle={addCompareBoxHandle}
      />
      {/* <IngredientInfo
        ingredients={ingredients}
        open={isModalOpen}
        modalOpenHandle={modalOpenHandle}
      /> */}
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

export default Detail;

import Image from 'next/image';
import wrapper from '../../src/stores';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { getProductInfoAction } from '../../src/stores/modules/productInfo';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import axios from 'axios';

import ProductInfo from '../../src/components/detail/productInfo';
import Review from '../../src/components/detail/Review';
import IngredientInfo from '../../src/components/detail/IngredientInfo';
import DescriptionInfo from '../../src/components/detail/DescriptionInfo';
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
  const [isModalOpen, setIsModalOpen] = useState({
    description: false,
    ingredient: false,
  });
  const { id } = router.query;

  useEffect(() => {
    dispatch(getProductInfoAction(id));
  }, [id]);

  const modalOpenHandle = useCallback(
    (kind) => {
      console.log('kind', kind);
      setIsModalOpen({
        ...isModalOpen,
        [kind]: !isModalOpen[kind],
      });
    },
    [isModalOpen]
  );

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

  const { name, description, ingredientList, ...rest } = productInfo;
  return (
    <DetailBlock>
      <ProductInfo
        {...rest}
        name={name}
        modalOpenHandle={modalOpenHandle}
        addCompareBoxHandle={addCompareBoxHandle}
      />
      <Review />
      <DescriptionInfo
        name={name}
        open={isModalOpen.description}
        description={description}
        modalOpenHandle={modalOpenHandle}
      />
      <IngredientInfo
        ingredients={ingredientList}
        open={isModalOpen.ingredient}
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

  @media screen and (max-width: 860px) {
    width: 100%;
  }
`;

export default Detail;

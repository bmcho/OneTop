import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ProductInfo from '../../src/components/detail/ProductInfo';
import Review from '../../src/components/detail/Review';
import IngredientInfo from '../../src/components/detail/modalInfo/IngredientInfo';
import DescriptionInfo from '../../src/components/detail/modalInfo/DescriptionInfo';
import LoadingComponent from '../../src/components/commons/loading/LoadingComponent';
import { useCallback, useEffect, useState } from 'react';
import { addProductCompareInfoAction } from '../../src/stores/modules/productCompareInfo';
import { getProductInfoAction } from '../../src/stores/modules/productInfo';
import Error from 'next/error';
import { NextSeo } from 'next-seo';

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

  if (loading) return <LoadingComponent />;
  if (error)
    return <Error statusCode={500} title={'상품이 존재하지 않습니다.'} />;
  if (!productInfo) return null;

  const { name, description, ingredientList, ...rest } = productInfo;
  return (
    <DetailBlock>
      <NextSeo title="상품 | reCco" />
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

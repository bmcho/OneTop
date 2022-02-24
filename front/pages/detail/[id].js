import Image from 'next/image';
import wrapper from '../../src/stores';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { getProductInfoAction } from '../../src/stores/modules/productInfo';
import { useSelector } from 'react-redux';
import { colorByLevel } from '../../src/utils/colorByLevel';
import { theme } from '../../styles/theme';
import styled from 'styled-components';
import axios from 'axios';

import ProductInfo from '../../src/components/detail/productInfo';

const Detail = (props) => {
  const router = useRouter();
  const { data, error } = useSelector((state) => state.productInfo);

  if (error) return <div>error...</div>;

  return (
    <DetailBlock>
      <ProductInfo data={data} />
      <IngredientUl>
        {data?.ingredients?.map((ingredient) => {
          const maxLevel = Math.max(
            ...ingredient.level.split('-').map((level) => parseInt(level))
          );
          const backgroundColor = colorByLevel(maxLevel);

          return (
            <IngredientLi key={ingredient.name}>
              <GradeInfo background={theme.color[backgroundColor]}>
                {ingredient.level}
              </GradeInfo>
              <IngredientName>
                <h6>{ingredient.name}</h6>
                <h6>{ingredient.nameEn}</h6>
                <h6>{ingredient.purpose}</h6>
              </IngredientName>
            </IngredientLi>
          );
        })}
      </IngredientUl>
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

const IngredientUl = styled.ul`
  display: flex;
  flex-direction: column;
`;

const IngredientLi = styled.li`
  display: flex;
  padding: 5px 0;
  align-items: center;
`;

const IngredientName = styled.div`
  display: flex;
  flex-direction: column;
  h6 {
    padding: 3px 0;
    letter-spacing: 1.2px;
  }
`;

const GradeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  min-height: 100%;
  padding: 4px 5px;
  border-radius: 10px 30px 30px;
  background: ${(props) => props.background};
  color: rgb(255, 255, 255);
  font-size: 1rem;
  white-space: nowrap;
  font-weight: 600;
  margin: 5px 10px;
`;

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
      return {
        revalidate: 1,
      };
    }
);

export default Detail;

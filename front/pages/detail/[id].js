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

  return (
    <Container>
      <Image
        src={data.img}
        alt={'상품이미지'}
        width={400}
        height={400}
        layout="fixed"
      />
      <h2>{data.name}</h2>
      <h3>{data.brand}</h3>
      <h4>{`${data.price}/${data.capacity}`}</h4>
      <IngredientUl>
        {data?.ingredients?.map((ingredient) => (
          <IngredientLi>
            <GradeInfo>
              <div>
                <div>{ingredient[0]}</div>
              </div>
            </GradeInfo>
            <IngredientName>
              <h6>{ingredient[1]}</h6>
              <h6>{ingredient[2]}</h6>
              <h6>{ingredient[3]}</h6>
            </IngredientName>
          </IngredientLi>
        ))}
      </IngredientUl>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IngredientUl = styled.ul`
  display: flex;
  flex-direction: column;
`;
const IngredientLi = styled.li`
  display: flex;
  & + & {
    margin-top: 10px;
  }
`;
const IngredientName = styled.div`
  display: flex;
  flex-direction: column;
`;

const GradeInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 25px;
    min-height: 100%;
    padding: 4px 5px;
    border-radius: 10px 30px 30px;
    background: rgb(0, 157, 78);
    div {
      color: rgb(255, 255, 255);
      font-size: 1rem;
      font-weight: 600;
      white-space: nowrap;
    }
  }
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
    }
);

export default Detail;

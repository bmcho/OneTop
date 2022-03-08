import styled from 'styled-components';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../../styles/theme';
import { useRouter } from 'next/router';

const ProductInfo = ({
  img,
  hashTag,
  name,
  brand,
  capacity,
  price,
  modalOpenHandle,
  addCompareBoxHandle,
}) => {
  return (
    <Container>
      <Image
        src={img}
        alt={'상품이미지'}
        width={450}
        height={450}
        layout="fixed"
      />
      <InfoContainer>
        <TagUl>
          {hashTag &&
            hashTag.map((tag) => {
              return <li key={tag}>{tag}</li>;
            })}
        </TagUl>
        <h3>{name}</h3>
        <InfoLi>
          <span>Brand</span> {brand}
        </InfoLi>
        <InfoLi>
          <span>Size</span> {capacity}
        </InfoLi>
        <InfoLi>
          <span>Price</span> {price}
        </InfoLi>
        <InfoLi>
          <span>Description</span>
          <button onClick={() => modalOpenHandle('description')}>
            설명보기
          </button>
        </InfoLi>
        <InfoLi>
          <span>Ingredient</span>
          <button onClick={() => modalOpenHandle('ingredient')}>
            성분보기
          </button>
        </InfoLi>
        <InfoLi>
          <span>Compare Box</span>
          <button onClick={addCompareBoxHandle}>보관함에 넣기</button>
        </InfoLi>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0 40px;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: 100px;
  @media screen and (max-width: 860px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InfoContainer = styled.ul`
  h3 {
    font-size: 30px;
    font-weight: 900;
    margin-bottom: 40px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 380px;
  margin-right: 40px;

  @media screen and (max-width: 860px) {
    margin-right: 0;
    width: 380px;
  }
`;

const TagUl = styled.ul`
  display: flex;
  margin-bottom: 10px;
  li + li {
    margin-left: 6px;
  }
`;

const InfoLi = styled.li`
  span {
    font-weight: 600;
  }
  button {
    font-size: 16px;
    padding: 0;
  }
  button:hover {
    color: ${theme.color.orange2};
  }

  letter-spacing: 1.5px;
  line-height: calc(100% + 1.5px);
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.3);
`;

export default ProductInfo;

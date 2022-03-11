import styled from 'styled-components';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { removeProductCompareInfoAction } from '../../stores/modules/productCompareInfo';

const CompareItemInfo = ({
  product_num,
  img_url,
  brand,
  name,
  price,
  capacity,
}) => {
  const dispatch = useDispatch();

  const productRemoveHandle = (id) => {
    dispatch(removeProductCompareInfoAction(id));
  };

  return (
    <>
      <ItemImage>
        <RemoveButton onClick={() => productRemoveHandle(product_num)}>
          삭제
        </RemoveButton>
        <ImageWrapper>
          <Image src={img_url} width={123} height={123} layout="responsive" />
        </ImageWrapper>
      </ItemImage>
      <InfoBlock>
        <span>브랜드</span>
        {brand}
      </InfoBlock>
      <InfoBlock>
        <span>제품명</span>
        {name}
      </InfoBlock>
      <InfoBlock>
        <span>가격</span>
        {price}
      </InfoBlock>
      <InfoBlock>
        <span>용량</span>
        {capacity}
      </InfoBlock>
    </>
  );
};

const ItemImage = styled.div`
  position: relative;
`;

const InfoBlock = styled.div`
  position: relative;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 10px;
  span {
    position: absolute;
    top: 2px;
    left: 2px;
    font-size: 10px;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 15px;
  font-size: 12px;
  z-index: 99;
  font-weight: 900;
  background-color: rgba(252, 196, 25, 0.4);
  transition: all 0.5s ease;
  border-radius: 10px;
  &:hover {
    height: 100%;
    font-size: 18px;
  }
`;

const ImageWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  overflow: hidden;
`;

export default CompareItemInfo;

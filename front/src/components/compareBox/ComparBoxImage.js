import styled from 'styled-components';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { removeProductCompareInfoAction } from '../../stores/modules/productCompareInfo';

const CompareBoxImage = ({ imgUrl, productNum }) => {
  const dispatch = useDispatch();

  const productRemoveHandle = (id) => {
    dispatch(removeProductCompareInfoAction(id));
  };
  return (
    <>
      <ItemImage>
        <RemoveButton onClick={() => productRemoveHandle(productNum)}>
          삭제
        </RemoveButton>
        <ImageWrapper>
          <Image src={imgUrl} width={123} height={123} layout="responsive" />
        </ImageWrapper>
      </ItemImage>
    </>
  );
};

const ItemImage = styled.div`
  position: relative;
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

export default CompareBoxImage;

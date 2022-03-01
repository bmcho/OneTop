import styled from 'styled-components';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineShoppingBasket } from 'react-icons/md';
import Image from 'next/image';
import { theme } from '../../../styles/theme';
import { removeProductCompareInfoAction } from '../../stores/modules/productCompareInfo';

const CompareBox = ({ comparBoxOpenHandle }) => {
  const { data, error } = useSelector((state) => state.productCompareInfo);
  const dispatch = useDispatch();
  const productRemoveHandle = (id) => {
    dispatch(removeProductCompareInfoAction(id));
  };
  return (
    <CompareBoxBlock>
      <StyledMdOutlineClose size={24} onClick={comparBoxOpenHandle} />
      <Header>
        <MdOutlineShoppingBasket size={30} />
        <span>보관함</span>
      </Header>
      {!data.length ? (
        <TextBlock>보관함에 넣기를 통해 상품을 넣어주세요</TextBlock>
      ) : (
        <ItemTable>
          <thead>
            <tr>
              <th></th>
              {data.map((d, index) => {
                return (
                  <th key={`${d.id}${index}`}>
                    <RemoveButton onClick={() => productRemoveHandle(d.id)}>
                      삭제
                    </RemoveButton>
                    <Image src={d.img} width={92.5} height={92.5} />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Brand</th>
              {data.map((d, index) => {
                return <td key={`${d.id}${index}`}>{d.brand}</td>;
              })}
            </tr>
            <tr>
              <th>Name</th>
              {data.map((d, index) => {
                return <td key={`${d.id}${index}`}>{d.name}</td>;
              })}
            </tr>
          </tbody>
        </ItemTable>
        // <ItemsUl>
        //   <ItemLi>
        //     <div>이미지</div>
        //     <div>name</div>
        //   </ItemLi>
        //   {data.map((product) => {
        //     return (
        //       <ItemLi>
        //         <div>
        //           <Image src={product.img} width={92.5} height={92.5} />
        //         </div>
        //         <div>{product.name}</div>
        //       </ItemLi>
        //     );
        //   })}
        // </ItemsUl>
      )}
    </CompareBoxBlock>
  );
};

const CompareBoxBlock = styled.div`
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 370px;
  height: 680px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.color.yellow2};
  border-radius: 30px;
  padding: 17px 22px 0;
`;

const StyledMdOutlineClose = styled(MdOutlineClose)`
  position: absolute;
  top: 20px;
  right: 30px;
  &:hover {
    color: ${({ theme }) => theme.color.orange2};
    cursor: pointer;
  }
`;

const Header = styled.div`
  span {
    margin-left: 8px;
  }
  height: 30px;
  text-align: left;
  line-height: 30px;
  font-size: 18px;
  font-weight: 900;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

const TextBlock = styled.div`
  height: 618px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemsUl = styled.ul`
  display: flex;
`;

const ItemLi = styled.li`
  width: 92.5px;
  display: flex;
  flex-direction: column;
  > div {
    height: 92.5px;
    border: 1px solid ${({ theme }) => theme.color.black};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ItemTable = styled.table`
  border: 1px solid ${({ theme }) => theme.color.black};
  border-collapse: collapse;

  td,
  th {
    width: 92.5px;
    height: 80px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid ${({ theme }) => theme.color.black};
  }
  th {
    position: relative;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 92.5px;
  height: 12px;
  font-size: 10px;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
  &:hover {
    height: 100%;
    background-color: ${({ theme }) => theme.color.gray2};
    color: ${({ theme }) => theme.color.white};
    font-size: 18px;
    font-weight: 900;
  }
`;

export default CompareBox;

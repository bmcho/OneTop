import React from 'react';
import styled from 'styled-components';

const ResultSort = ({ onChange, value }) => (
  <Select onChange={onChange} value={value}>
    <option value="id desc">최신순</option>
    <option value="id asc">오래된순</option>
    <option value="name asc">가나다 오름차순</option>
    <option value="name desc">가나다 내림차순</option>
    <option value="price asc">가격 낮은순</option>
    <option value="price desc">가격 높은순</option>
  </Select>
);
const Select = styled.select`
  height: 35px;
  background: white;
  color: ${(props) => props.theme.color.gray3};
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
`;
export default ResultSort;

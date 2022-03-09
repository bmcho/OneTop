import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import {
  setRequestDataAction,
  setRequestPageAction,
  setResultTypeAction,
} from '../../../../../stores/modules/searchKeyword';

const Tab = (props) => {
  const dispatch = useDispatch();
  const { searchKeyword, sort, resultType } = useSelector(
    (state) => state.searchKeyword
  );

  const clickResultTypeTab = (type) => {
    const newRequestPage = 0;
    dispatch(setResultTypeAction(type));
    dispatch(setRequestPageAction(newRequestPage));
    dispatch(
      setRequestDataAction({
        requestPage: newRequestPage,
        sort: sort,
        searchResultType: type,
        keyword: searchKeyword,
      })
    );
  };

  return (
    <TabBlock>
      <TabItem
        active={resultType === 'product'}
        onClick={() => clickResultTypeTab('product')}
      >
        상품
      </TabItem>
      <TabItem
        active={resultType === 'brand'}
        onClick={() => clickResultTypeTab('brand')}
      >
        브랜드
      </TabItem>
      <TabItem
        active={resultType === 'ingredient'}
        onClick={() => clickResultTypeTab('ingredient')}
      >
        성분
      </TabItem>
    </TabBlock>
  );
};
const TabBlock = styled.div`
  display: flex;
`;
const TabItem = styled.div`
  width: 50px;
  text-align: center;
  padding: 10px 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray1};

  &:hover {
    background-color: ${(props) => props.theme.color.yellow2};
  }
  ${(props) => {
    if (props.active) {
      return css`
        border-left: 1px solid ${(props) => props.theme.color.lightGray1};
        border-right: 1px solid ${(props) => props.theme.color.lightGray1};
        border-top: 2px solid ${(props) => props.theme.color.yellow1};
        border-bottom: none;
      `;
    }
  }};
`;

export default Tab;

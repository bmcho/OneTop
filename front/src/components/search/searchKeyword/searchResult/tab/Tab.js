import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { media } from '../../../../../../styles/theme';
import {
  setRequestDataAction,
  setSearchKeywordAction,
} from '../../../../../stores/modules/searchKeyword';

const Tab = (props) => {
  const dispatch = useDispatch();
  const { keywordResultRequestData } = useSelector(
    (state) => state.searchKeyword
  );

  const clickResultTypeTab = (type) => {
    dispatch(
      setSearchKeywordAction({
        searchResultType: type,
        requestPage: 0,
      })
    );
    dispatch(setRequestDataAction());
  };

  return (
    <TabBlock>
      <TabItem
        active={keywordResultRequestData.searchResultType === 'product'}
        onClick={() => clickResultTypeTab('product')}
      >
        상품
      </TabItem>
      <TabItem
        active={keywordResultRequestData.searchResultType === 'brand'}
        onClick={() => clickResultTypeTab('brand')}
      >
        브랜드
      </TabItem>
      <TabItem
        active={keywordResultRequestData.searchResultType === 'ingredient'}
        onClick={() => clickResultTypeTab('ingredient')}
      >
        성분
      </TabItem>
    </TabBlock>
  );
};
const TabBlock = styled.div`
  display: flex;
  ${media.mobile} {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
const TabItem = styled.div`
  width: 50px;
  text-align: center;
  padding: 10px 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray1};

  &:hover {
    background-color: ${(props) => props.theme.color.yellow2};
    cursor: pointer;
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
  ${media.mobile} {
    width: 33%;
    box-sizing: border-box;
  }
`;

export default Tab;

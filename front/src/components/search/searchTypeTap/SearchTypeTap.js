import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSearchTapState } from '../../../stores/modules/searchTypeTap';

const SearchTypeTap = (props) => {
  const dispatch = useDispatch();
  const { tapState } = useSelector((state) => state.searchTypeTap);
  const changeTypeState = (state) => {
    dispatch(setSearchTapState(state));
  };
  return (
    <>
      <NavBlock>
        <Item
          onClick={() => {
            changeTypeState('category');
          }}
          type={'category'}
          typeState={tapState}
        >
          카테고리
        </Item>
        <Item
          onClick={() => {
            changeTypeState('keyword');
          }}
          type={'keyword'}
          typeState={tapState}
        >
          키워드
        </Item>
        <Item
          onClick={() => {
            changeTypeState('ingredient');
          }}
          type={'ingredient'}
          typeState={tapState}
        >
          성분
        </Item>
      </NavBlock>
    </>
  );
};

const NavBlock = styled.nav`
  display: flex;
  justify-content: space-around;
}
`;
const Item = styled.li`
  width: 100%;
  text-align: center;
  padding: 10px;
  margin: 0 10px;
  background-color: ${(props) =>
    props.type === props.typeState && props.theme.color.yellow1};
  border-radius: 10px;
  position: relative;
  &::before,
  &::after {
    box-sizing: inherit;
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-color: ${(props) => props.theme.color.yellow1};
    border: ${(props) => props.type === props.typeState && `2px solid black`};
    width: ${(props) => props.type === props.typeState && '100%'};
    height: ${(props) => props.type === props.typeState && '100%'};
  }

  &::before {
    top: 0;
    left: 0;
  }

  &::after {
    bottom: 0;
    right: 0;
  }

  &:hover {
    cursor: pointer;
  }

  &::before {
    border-color: ${(props) => props.type === props.typeState && 'black'};
    transition: ${(props) =>
      props.type === props.typeState &&
      'width 0.25s ease-out, height 0.25s ease-out 0.25s'};
  }

  &::after {
    border-color: ${(props) => props.type === props.typeState && 'black'};
    transition: ${(props) =>
      props.type === props.typeState &&
      'border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s, height 0.25s ease-out 0.75s'};
  }
`;
export default SearchTypeTap;

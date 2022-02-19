import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setSearchTapState } from '../../../stores/modules/searchTypeTap';

const SearchTypeTap = (props) => {
  const dispatch = useDispatch();
  const [typeState, setTypeState] = useState('category');
  const changeTypeState = (state) => {
    setTypeState(state)
    dispatch(setSearchTapState(state))
  }
  return (
    <>
      <NavBlock>
        <Item
          onClick={() => { changeTypeState('category') }}
          type={'category'}
          typeState={typeState}
        >카테고리</Item>
        <Item
          onClick={() => { changeTypeState('keyword') }}
          type={'keyword'}
          typeState={typeState}
        >키워드</Item>
        <Item
          onClick={() => { changeTypeState('ingredient') }}
          type={'ingredient'}
          typeState={typeState}
        >성분</Item>
      </NavBlock>
    </>
  )
};

const NavBlock = styled.nav`
  display: flex;
  justify-content: space-around;
}
`
const Item = styled.li`
  width:100%;
  text-align:center;
  padding:6px;
  border-bottom: ${props => props.type === props.typeState && '2px solid black'};
`
export default SearchTypeTap;

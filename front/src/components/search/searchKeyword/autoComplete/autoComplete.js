import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setAutoCompleteKeywordAction, setSearchKeywordAction, setSearchKeywordHistoryAction } from '../../../../stores/modules/searchKeyword';

const AutoComplete = (props) => {
  const dispatch = useDispatch();

  const { autoCompleteData, searchKeywordHistory } = useSelector(state => state.searchKeyword);
  const clickSearchQuery = (keyword) => { //keyword history 저장 검색결과 요청
    dispatch(setAutoCompleteKeywordAction(keyword))
    dispatch(setSearchKeywordAction(keyword))
    addSearchKeywordHistory(keyword)
  }
  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(searchKeywordHistory))
  }, [searchKeywordHistory])

  const addSearchKeywordHistory = (keyword) => {
    dispatch(setSearchKeywordHistoryAction(keyword))
  }
  return (
    <div>
      {autoCompleteData && (
        <AutoCompleteList>
          {autoCompleteData.map(show => (
            <AutoCompleteItem key={show.id} onClick={() => clickSearchQuery(show.name)}>
              <AutoCompleteItemButton>
                <span>{show.name}</span>
                <span>검색</span>
              </AutoCompleteItemButton>
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      )}
    </div>
  )
};
const AutoCompleteList = styled.ul`
  width: 100%;

`
const AutoCompleteItem = styled.li`
&:hover{
  background-color:#eee;
}
`
const AutoCompleteItemButton = styled.button`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`

export default AutoComplete;

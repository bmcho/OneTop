import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadDataSuccessAction, setAutoCompleteKeywordAction, setSearchKeywordAction, setSearchKeywordHistoryAction } from '../../../stores/modules/searchKeyword';

const AutoComplete = (props) => {
  const dispatch = useDispatch();

  const { autoCompleteData, searchResultData, searchKeywordHistory } = useSelector(state => state.searchKeyword);
  const clickSearchQuery = (keyword) => { //keyword history 저장 검색결과 요청
    dispatch(setAutoCompleteKeywordAction(keyword))
    dispatch(setSearchKeywordHistoryAction(keyword))
    dispatch(setSearchKeywordAction(keyword))
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
      {searchKeywordHistory && (
        <div>{searchKeywordHistory.map(keyword => (
          <div>{keyword}</div>
        ))}
        </div>
      )}
    </div>
  )
};
const AutoCompleteList = styled.ul`
  width: 500px;

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

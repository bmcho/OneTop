import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteSearchKeywordHistoryAction } from '../../../stores/modules/searchKeyword';

const SearchHistory = (props) => {
  const dispatch = useDispatch();
  const { searchKeywordHistory } = useSelector(state => state.searchKeyword);

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(searchKeywordHistory))
  }, [searchKeywordHistory])

  const deleteSearchKeyword = (e) => {
    dispatch(deleteSearchKeywordHistoryAction((e.target.dataset.index)))
  }

  return (
    <div>
      {searchKeywordHistory && (
        <SearchKeywordHistoryList>
          {searchKeywordHistory.map((keyword, idx) => (
            <SearchKeywordHistoryItem key={idx}>
              <SearchKeywordHistoryItemButton>{keyword}</SearchKeywordHistoryItemButton>
              <KeywordDeleteButton onClick={deleteSearchKeyword} data-index={idx}>x</KeywordDeleteButton>
            </SearchKeywordHistoryItem>
          ))}
        </SearchKeywordHistoryList>
      )}
    </div>
  )
};
const SearchKeywordHistoryList = styled.ul`
  width: 500px;
`
const SearchKeywordHistoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  &:hover{
    background-color:#eee;
  }
`
const SearchKeywordHistoryItemButton = styled.span`
  width: 100%;
`
const KeywordDeleteButton = styled.button`
  padding:2px;
`
export default SearchHistory;

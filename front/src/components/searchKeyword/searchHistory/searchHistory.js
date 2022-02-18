import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const SearchHistory = (props) => {
  const { searchKeywordHistory } = useSelector(state => state.searchKeyword);

  return (
    <div>
      {searchKeywordHistory && (
        <SearchKeywordHistoryList>
          {searchKeywordHistory.map((keyword, idx) => (
            <SearchKeywordHistoryItem key={idx}>
              <SearchKeywordHistoryItemButton>{keyword}</SearchKeywordHistoryItemButton>
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
&:hover{
  background-color:#eee;
}
`
const SearchKeywordHistoryItemButton = styled.span`
  width: 100%;
  padding: 10px;
`
export default SearchHistory;

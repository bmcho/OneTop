import React, { useEffect } from 'react';
import { BiTime } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { theme } from '../../../../../styles/theme';
import { deleteSearchKeywordHistoryAction, setSearchKeywordAction, setAutoCompleteKeywordAction, setSearchKeywordHistoryAction } from '../../../../stores/modules/searchKeyword';

const SearchHistory = (props) => {
  const dispatch = useDispatch();
  const { searchKeywordHistory } = useSelector(state => state.searchKeyword);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('keywords')) || JSON.parse(localStorage.getItem('keywords')).length === 0) {
      localStorage.setItem('keywords', JSON.stringify(searchKeywordHistory))
    }
  }, [searchKeywordHistory])

  const deleteSearchKeyword = (e) => {
    dispatch(deleteSearchKeywordHistoryAction(e.target.dataset.index))
  }
  const clickHistoryItem = (e) => {
    dispatch(setAutoCompleteKeywordAction(searchKeywordHistory[e.target.dataset.index]))
    dispatch(setSearchKeywordAction(searchKeywordHistory[e.target.dataset.index]))
  }

  return (
    <div>
      {searchKeywordHistory && (
        <div>
          <Title>최근 검색어</Title>
          <SearchKeywordHistoryList>
            {searchKeywordHistory.map((keyword, idx) => (
              <SearchKeywordHistoryItem key={idx} >
                <SearchKeywordHistoryItemTitle onClick={clickHistoryItem} data-index={idx}>
                  <IconWrap>
                    <BiTime size={18} color={theme.color.lightGray3} />
                  </IconWrap>
                  <span>{keyword}</span>
                </SearchKeywordHistoryItemTitle>
                <KeywordDeleteButton onClick={deleteSearchKeyword} data-index={idx}>x</KeywordDeleteButton>
              </SearchKeywordHistoryItem>
            ))}
          </SearchKeywordHistoryList>
        </div>

      )}
    </div>
  )
};
const Title = styled.p`
padding:10px;
`
const SearchKeywordHistoryList = styled.ul`
  width: 100%;
`
const SearchKeywordHistoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  &:hover{
    background-color:${theme.color.lightGray3};
  }
`
const SearchKeywordHistoryItemTitle = styled.span`
  width: 100%;
  display:flex;
  align-items: center;
  &:hover{
    cursor:pointer;
  }
`
const KeywordDeleteButton = styled.button`
  padding:2px;
`
const IconWrap = styled.span`
margin-right:12px;
padding: 5px;
background-color: ${theme.color.lightGray1};
border-radius: 50%;
width: 28px;  
height: 28px;
box-sizing: border-box;
`
export default SearchHistory;

import React, { useEffect, useState } from 'react';
import { BiTime } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TiDelete } from 'react-icons/ti';
import { AiOutlineFileSearch } from 'react-icons/ai';
import {
  setAutoCompleteKeywordAction,
  setSearchKeywordAction,
  setRequestDataAction,
} from '../../../../stores/modules/searchKeyword';
import { theme } from '../../../../../styles/theme';

const SearchHistory = (props) => {
  const dispatch = useDispatch();
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const keywords = JSON.parse(localStorage.getItem('keywords') || '[]');
    setSearchHistory(keywords);
  }, []);

  const deleteSearchKeyword = (e) => {
    const idx = parseInt(e.currentTarget.dataset.index);
    const keywords = JSON.parse(localStorage.getItem('keywords'));
    keywords.splice(idx, 1);
    localStorage.setItem('keywords', JSON.stringify(keywords));
    setSearchHistory(keywords);
  };

  const clickHistoryItem = (e) => {
    const keyword = searchHistory[e.currentTarget.dataset.index];
    dispatch(
      setSearchKeywordAction({
        keyword: keyword,
        searchResultType: 'product',
        requestPage: 0,
        sort: 'id desc',
      })
    );
    dispatch(setRequestDataAction());

    dispatch(setAutoCompleteKeywordAction(keyword));

    setSearchHistoryInLocal(keyword);
    setSearchHistory((cur) => {
      const newArr = [...cur];
      newArr.splice(e.currentTarget.dataset.index);
      newArr.unshift(cur[e.currentTarget.dataset.index]);
      return newArr;
    });
  };
  const setSearchHistoryInLocal = (newKeyword) => {
    const keywords = JSON.parse(localStorage.getItem('keywords')) || [];

    const idx = keywords.findIndex((keyword) => keyword === newKeyword);
    keywords.splice(idx, 1);
    keywords.unshift(newKeyword);
    localStorage.setItem('keywords', JSON.stringify(keywords));
  };
  return (
    <div>
      {searchHistory.length !== 0 ? (
        <div>
          <Title>최근 검색어</Title>
          <SearchKeywordHistoryList>
            {searchHistory.map((keyword, idx) => (
              <SearchKeywordHistoryItem key={idx}>
                <SearchKeywordHistoryItemTitle
                  onClick={clickHistoryItem}
                  data-index={idx}
                >
                  <IconWrap>
                    <BiTime size={18} color={theme.color.lightGray3} />
                  </IconWrap>
                  <span>{keyword}</span>
                </SearchKeywordHistoryItemTitle>
                <KeywordDeleteButton
                  onClick={deleteSearchKeyword}
                  data-index={idx}
                >
                  <TiDelete size={18} color={theme.color.gray4} />
                </KeywordDeleteButton>
              </SearchKeywordHistoryItem>
            ))}
          </SearchKeywordHistoryList>
        </div>
      ) : (
        <NoSearchHistory>
          <AiOutlineFileSearch size={60} color={theme.color.lightGray1} />
          <NoSearchHistoryText>궁금한 제품을 검색해보세요!</NoSearchHistoryText>
        </NoSearchHistory>
      )}
    </div>
  );
};
const Title = styled.p`
  padding: 10px;
`;
const SearchKeywordHistoryList = styled.ul`
  width: 100%;
`;
const SearchKeywordHistoryItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  &:hover {
    background-color: ${(props) => props.theme.color.lightGray3};
  }
`;
const SearchKeywordHistoryItemTitle = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: left;
  &:hover {
    cursor: pointer;
  }
`;
const KeywordDeleteButton = styled.button`
  padding: 2px;
`;
const IconWrap = styled.span`
  margin-right: 12px;
  padding: 5px;
  background-color: ${(props) => props.theme.color.lightGray1};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  box-sizing: border-box;
`;
const NoSearchHistory = styled.div`
  text-align: center;
  color: ${(props) => props.theme.color.gray4};
`;
const NoSearchHistoryText = styled.p`
  padding: 10px 0;
`;
export default SearchHistory;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  loadIngredientAutoCompleteDataSuccessAction,
  setIngredientAutoCompleteKeywordAction,
} from '../../../../stores/modules/searchIngredient';
import SearchBar from '../searchBar/SearchBar';

const SearchBlock = ({
  inputTitle,
  keywords,
  setKeywords,
  setAutoKeywords,
  autoCompleteKeyword,
  autoCompleteData,
  clearAutoCompleteData,
}) => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const listData = inputTitle + 'Ingredient';

  useEffect(() => {
    console.log(inputText, 'block');
  }, []);
  const changeInputText = (e) => {
    const keyword = e.currentTarget.value;
    setInputText(keyword);
    // if (inputText.length > ingredientAutoCompleteKeyword.length) {
    //   dispatch(setSearchKeywordAction(''));
    // }
    // else
    if (keyword.length === 0) {
      dispatch(clearAutoCompleteData());
      dispatch(setAutoKeywords(''));
    }
    //  else {
    console.log(keyword, 'component');
    dispatch(setAutoKeywords(keyword));
    // }
  };
  const addKeyword = (e) => {
    if (e.key === 'Enter' && inputText !== '') {
      setKeywords((cur) => [...cur, inputText]);
      setInputText('');
      dispatch(clearAutoCompleteData());
    }
  };
  const deleteLastKeyword = (e) => {
    if (e.key === 'Backspace' && inputText === '') {
      setKeywords((cur) => {
        const newList = [...cur];
        newList.pop();
        return newList;
      });
    }
  };

  return (
    <SearchBarBlock>
      <Title>{inputTitle}</Title>
      <div>
        {keywords.map((word, idx) => (
          <KeywordItem key={idx}>{word}</KeywordItem>
        ))}
        <SearchBar
          inputText={inputText}
          changeInputText={changeInputText}
          addKeyword={addKeyword}
          deleteLastKeyword={deleteLastKeyword}
        />
        <ul>
          {autoCompleteData.length !== 0 &&
            autoCompleteData.map((e) => <div>{e}</div>)}
        </ul>
        {/* <Input
          value={inputText}
          type="text"
          placeholder="성분을 입력하세요"
          onChange={changeInputText}
          onKeyPress={addKeyword}
          onKeyDown={deleteLastKeyword}
        /> */}
      </div>
    </SearchBarBlock>
  );
};
const SearchBarBlock = styled.div`
  padding: 20px 0;
`;
const Title = styled.h2`
  padding: 10px 0;
`;
const KeywordItem = styled.div`
  display: inline-block;
  padding: 10px;
  margin: 0 10px 10px 0;
  background-color: ${(props) => props.theme.color.lightGray3};
  border-radius: 16px;
  color: ${(props) => props.theme.color.purple};
`;
const Input = styled.input`
  border: none;
`;
export default SearchBlock;

import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const SearchBar = ({ inputTitle }) => {
  const [keywords, setKeywords] = useState([]);
  const [inputText, setInputText] = useState('');
  const changeInputText = (e) => {
    setInputText(e.target.value);
  };
  const addKeyword = (e) => {
    if (e.key === 'Enter' && inputText !== '') {
      setKeywords((cur) => [...cur, inputText]);
      setInputText('');
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
        <Input
          value={inputText}
          type="text"
          placeholder="성분을 입력하세요"
          onChange={changeInputText}
          onKeyPress={addKeyword}
          onKeyDown={deleteLastKeyword}
        />
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
export default SearchBar;

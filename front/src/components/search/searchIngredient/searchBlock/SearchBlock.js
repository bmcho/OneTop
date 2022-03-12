import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const SearchBlock = ({
  inputTitle,
  keywords,
  setKeywords,
  setAutoKeywords,
  autoCompleteData,
  clearAutoCompleteData,
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const resultsRef = useRef();
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (autoCompleteData.length > 0) {
      document.body.addEventListener('keydown', onKeyDown);
    } else {
      document.body.removeEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.removeEventListener('keydown', onKeyDown);
    };
  }, [autoCompleteData]);

  const onKeyDown = (event) => {
    if (event.isComposing) return;
    if (resultsRef.current) {
      const resultsItems = Array.from(resultsRef.current.children);
      const activeResultIndex = resultsItems.findIndex((child) => {
        return child.querySelector('button') === document.activeElement;
      });

      if (event.key === 'ArrowUp') {
        if (document.activeElement === inputRef.current) {
          resultsItems[resultsItems.length - 1].querySelector('button').focus();
        } else if (resultsItems[activeResultIndex - 1]) {
          resultsItems[activeResultIndex - 1].querySelector('button').focus();
        } else {
          inputRef.current.focus();
        }
      }

      if (event.key === 'ArrowDown') {
        if (document.activeElement === inputRef.current) {
          resultsItems[0].querySelector('button').focus();
        } else if (resultsItems[activeResultIndex + 1]) {
          resultsItems[activeResultIndex + 1].querySelector('button').focus();
        } else {
          inputRef.current.focus();
        }
      }
    }
  };

  const changeInputText = (e) => {
    const keyword = e.currentTarget.value;

    setInputText(keyword);

    if (keyword.length === 0) {
      dispatch(clearAutoCompleteData());
      dispatch(setAutoKeywords(''));
    }
    dispatch(setAutoKeywords(keyword));
  };

  const addKeyword = (item) => {
    setKeywords((cur) => [...cur, item]);
    setInputText('');
    dispatch(clearAutoCompleteData());
    inputRef.current.focus();
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
        <SearchBar>
          <Input
            value={inputText}
            ref={inputRef}
            type="text"
            placeholder="성분을 입력하세요"
            onChange={changeInputText}
            // onKeyPress={addKeyword}
            onKeyDown={deleteLastKeyword}
          />
          <AutoCompleteList ref={resultsRef}>
            {autoCompleteData.length !== 0 &&
              autoCompleteData.map((item, idx) => (
                <AutoCompleteItem key={idx} onClick={() => addKeyword(item)}>
                  <AutoCompleteItemButton>{item}</AutoCompleteItemButton>
                </AutoCompleteItem>
              ))}
          </AutoCompleteList>
        </SearchBar>
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
const SearchBar = styled.div`
  display: inline-block;
`;
const Input = styled.input`
  border: none;
`;
const AutoCompleteList = styled.ul`
  position: absolute;
  background-color: white;
`;
const AutoCompleteItem = styled.li`
  background-color: ${(props) => props.theme.color.lightGray3};
`;
const AutoCompleteItemButton = styled.button`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: ${(props) => props.theme.color.yellow2};
  }
  &:focus {
    background-color: ${(props) => props.theme.color.yellow2};
  }
`;
export default SearchBlock;

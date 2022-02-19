import React, { useRef, useState } from 'react';

const SearchBar = ({ inputTitle }) => {
  const inputRef = useRef();
  const [keywords, setKeywords] = useState([]);
  const [inputText, setInputText] = useState('');
  const changeInputText = (e) => {
    setInputText(e.target.value)
  }
  const addKeyword = (e) => {
    if (e.key === 'Enter' && inputText !== '') {
      setKeywords(cur => [...cur, inputText])
      setInputText('')
    }
  }
  const deleteLastKeyword = (e) => {
    if (e.key === 'Backspace' && inputText === '') {
      setKeywords(cur => {
        const newList = [...cur];
        newList.pop();
        return newList;
      })
    }
  }

  return (
    <div>
      <div>{inputTitle}</div>
      <div>
        {keywords.map(word => (<div>{word}</div>))}
        <input
          value={inputText}
          type='text'
          onChange={changeInputText}
          onKeyPress={addKeyword}
          onKeyDown={deleteLastKeyword} />
      </div>
    </div>
  )
};

export default SearchBar;

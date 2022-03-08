import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchBar = ({
  inputText,
  changeInputText,
  addKeyword,
  deleteLastKeyword,
}) => {
  return (
    <div>
      <Input
        value={inputText}
        type="text"
        placeholder="성분을 입력하세요"
        onChange={changeInputText}
        onKeyPress={addKeyword}
        onKeyDown={deleteLastKeyword}
      />
    </div>
  );
};
const Input = styled.input`
  border: none;
`;
export default SearchBar;

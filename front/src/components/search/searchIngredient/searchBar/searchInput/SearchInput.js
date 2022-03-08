import React from 'react';

const SearchInput = (props) => (
  <Input
    value={inputText}
    type="text"
    placeholder="성분을 입력하세요"
    onChange={changeInputText}
    onKeyPress={addKeyword}
    onKeyDown={deleteLastKeyword}
  />
);

export default SearchInput;

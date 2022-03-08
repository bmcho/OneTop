import React, { useState } from 'react';
import styled from 'styled-components';
import { TiDelete } from 'react-icons/ti';
import { theme } from '../../../../../../styles/theme';
import { useSelector } from 'react-redux';

const SearchInput = ({
  inputRef,
  changeSearchValue,
  requestSearchResult,
  resetSearchKeyword,
  onKeyDown,
}) => {
  const { autoCompleteKeyword } = useSelector((state) => state.searchKeyword);
  const enterInput = (e) => {
    if (e.key === 'Enter') {
      requestSearchResult(e.currentTarget.value);
    }
  };

  return (
    <SearchInputBlock>
      <Input
        type="text"
        value={autoCompleteKeyword || ''}
        placeholder="제품명을 입력해주세요"
        onChange={changeSearchValue}
        onKeyPress={enterInput}
        ref={inputRef}
      />
      {autoCompleteKeyword.length !== 0 && (
        <Button onClick={resetSearchKeyword}>
          <TiDelete size={18} color={theme.color.gray4} />
        </Button>
      )}
    </SearchInputBlock>
  );
};

const SearchInputBlock = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => props.theme.color.lightGray3};
  box-sizing: border-box;
  font-size: 16px;
`;
const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
`;

export default SearchInput;

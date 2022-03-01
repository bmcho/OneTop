import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TiDelete } from 'react-icons/ti';
import {
  setSearchKeywordAction,
  setAutoCompleteKeywordAction,
  setSearchKeywordHistoryAction,
} from '../../../../../stores/modules/searchKeyword';
import { theme } from '../../../../../../styles/theme';

const SearchInput = (props) => {
  const dispatch = useDispatch();

  const { autoCompleteKeyword, autoCompleteData, searchKeyword } = useSelector(
    (state) => state.searchKeyword
  );
  // useEffect(() => {
  //   if (selected === -1) {
  //     inputRef.current.focus();
  //   }
  // }, [selected]);
  const changeSearchValue = (e) => {
    dispatch(setAutoCompleteKeywordAction(e.target.value));
    dispatch(setSearchKeywordAction(''));
  };
  const resetSearchKeyword = () => {
    dispatch(setAutoCompleteKeywordAction(''));
    dispatch(setSearchKeywordAction(''));
  };
  const requestSearchResult = (e) => {
    if (e.key === 'Enter') {
      console.log('enter');
      dispatch(setSearchKeywordAction(e.target.value));
      dispatch(setSearchKeywordHistoryAction(e.target.value));
    }
  };
  // const moveAutocompleteKeyword = (e) => {
  //   if (e.key === 'ArrowDown') {
  //     handleArrowKey('down');
  //   } else if (e.key === 'ArrowUp') {
  //     handleArrowKey('up');
  //   }
  // };
  const handleKeyboardAction = (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
      // if (selected >= 0) {
      //   dispatch(setSearchKeywordAction(autoCompleteData[selected]));
      //   dispatch(setSearchKeywordHistoryAction(autoCompleteData[selected]));
      //   setSelected(-1);
      // } else {
      dispatch(setSearchKeywordAction(e.target.value));
      dispatch(setSearchKeywordHistoryAction(e.target.value));
      // }
      console.log('enter');
    }
    // else if (
    //   e.key === 'ArrowDown' &&
    //   autoCompleteData.length - 1 > selected
    // ) {
    //   console.log('doit');
    //   setSelected((cur) => cur + 1);
    // } else if (e.key === 'ArrowUp' && selected >= 0) {
    //   setSelected((cur) => cur + 1);
    // }
    // else if (e.key === 'ArrowDown') {
    //   handleArrowKey('down');
    // } else if ((e.key = 'ArrowUp')) {
    //   handleArrowKey('up');
    // }
  };
  return (
    <SearchInputBlock>
      <Input
        type="text"
        value={autoCompleteKeyword || ''}
        placeholder="제품명을 입력해주세요"
        onChange={changeSearchValue}
        // onKeyPress={requestSearchResult}
        // onKeyDown={moveAutocompleteKeyword}
        // onKeyUp={handleKeyboardAction}
        // ref={inputRef}
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

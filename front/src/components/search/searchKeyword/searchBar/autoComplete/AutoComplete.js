import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  setSearchKeywordAction,
  setSearchKeywordHistoryAction,
} from '../../../../../stores/modules/searchKeyword';

const AutoComplete = (props) => {
  const dispatch = useDispatch();
  const { autoCompleteData, searchKeywordHistory } = useSelector(
    (state) => state.searchKeyword
  );
  const refs = useMemo(() => {
    if (autoCompleteData.length !== 0) {
      return autoCompleteData.map(() => React.createRef());
    }
  }, [autoCompleteData]);
  // const [focusStatus, setFocusStatus] = useState(
  //   arrowKeyDir === 'up' ? autoCompleteData.length - 1 : 0
  // );

  useEffect(() => {
    console.log('autocomplete mounted');
    return () => console.log('autocomplete unmounted');
  }, []);

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(searchKeywordHistory));
  }, [searchKeywordHistory]);

  const requestSearchResult = (keyword) => {
    //keyword history 저장, 검색결과 요청
    dispatch(setSearchKeywordAction(keyword));
    dispatch(setSearchKeywordHistoryAction(keyword));
  };
  // useEffect(() => {
  //   if (selected > 0) {
  //     refs[selected].current.focus();
  //   }

  //   console.log('refs', refs[selected]);
  //   console.log(selected);
  // }, [selected]);
  return (
    <div>
      {autoCompleteData && (
        <AutoCompleteList>
          {autoCompleteData.map((show, idx) => (
            <AutoCompleteItem
              key={show.id}
              // selected={selected === idx ? true : false}
              onClick={() => requestSearchResult(show.name)}
            >
              <AutoCompleteItemButton>
                <span>{show.name}</span>
                <span>검색</span>
              </AutoCompleteItemButton>
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      )}
    </div>
  );
};
const AutoCompleteList = styled.ul`
  width: 100%;
`;
const AutoCompleteItem = styled.li`
  background-color: ${(props) => (props.selected ? 'red' : 'white')};
  &:hover {
    background-color: #eee;
  }
`;
const AutoCompleteItemButton = styled.button`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export default AutoComplete;

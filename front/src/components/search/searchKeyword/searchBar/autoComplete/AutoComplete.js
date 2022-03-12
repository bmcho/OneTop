import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AutoComplete = ({ resultsRef, requestSearchResult }) => {
  const { autoCompleteData, keywordResultRequestData } = useSelector(
    (state) => state.searchKeyword
  );

  return (
    <div>
      {keywordResultRequestData.keyword.length === 0 && (
        // autoCompleteData.length !== 0 &&
        <AutoCompleteList ref={resultsRef}>
          {autoCompleteData.map(({ type, data }, idx) => (
            <AutoCompleteItem
              key={idx}
              onClick={() => requestSearchResult(data, type)}
            >
              <AutoCompleteItemButton>
                <span>{data}</span>
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
`;
const AutoCompleteItemButton = styled.button`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: ${(props) => props.theme.color.lightGray3};
  }
  &:focus {
    background-color: ${(props) => props.theme.color.lightGray3};
  }
`;

export default AutoComplete;

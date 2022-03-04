import React, { useEffect } from 'react';
import styled from 'styled-components';

const AutoComplete = ({
  resultsRef,
  autoCompleteData,
  searchResultData,
  requestSearchResult,
}) => {
  useEffect(() => {
    console.log('autocomplete mounted');
    return () => console.log('autocomplete unmounted');
  }, []);

  return (
    <div>
      {searchResultData.length === 0 && autoCompleteData && (
        <AutoCompleteList ref={resultsRef}>
          {autoCompleteData.map((show, idx) => (
            <AutoCompleteItem
              key={show.id}
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

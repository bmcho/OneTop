import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDataSuccessAction, setSearchKeywordAction, setSearchKeywordHistoryAction } from '../../../stores/modules/searchKeyword';

const AutoComplete = (props) => {
  const dispatch = useDispatch();

  const { autoCompleteData, searchResultData, searchKeywordHistory } = useSelector(state => state.searchKeyword);
  const clickSearchQuery = (keyword) => { //keyword history 저장 검색결과 요청
    dispatch(setSearchKeywordHistoryAction(keyword))
    dispatch(setSearchKeywordAction(keyword))
  }

  return (
    <div>
      {autoCompleteData && (
        <div >
          {autoCompleteData.map(show => (
            <div key={show.id} onClick={() => clickSearchQuery(show.name)}>
              <div>{show.name}</div>
            </div>
          ))}
        </div>
      )}
      <div onClick={() => clickSearchQuery('Superman')}>test superman</div>
      {searchKeywordHistory && (
        <div>{searchKeywordHistory.map(keyword => (
          <div>{keyword}</div>
        ))}
        </div>
      )}
    </div>
  )
};

export default AutoComplete;

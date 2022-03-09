import { all, fork, takeLatest, call, put, debounce } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import axios from 'axios';
import {
  loadAutoCompleteDataSuccessAction,
  loadDataFailureAction,
  loadDataSuccessAction,
  SET_SEARCH_KEYWORD,
  SET_AUTO_COMPLETE_KEYWORD,
  clearAutoCompleteDataAction,
  SET_REQUEST_DATA,
  setResultTotalPage,
} from '../modules/searchKeyword';
import { finishLoading, startLoading } from '../modules/loading';

const delay = 500;

function searchKeywordResultAPI(data) {
  console.log('keyword saga', data);
  const reqParam = {
    keyword: data.keyword,
    searchResultType: data.searchResultType,
    requestPage: data.requestPage,
    maxItemCountByPage: 10,
    sort: data.sort,
  };
  return axios.post(`${process.env.BASE_URL}/search/keyword`, reqParam);
}

function searchKeywordAutoCompleteAPI(data) {
  console.log('saga', data);
  const reqParam = {
    keyword: data,
  };
  return axios.post(
    `${process.env.BASE_URL}/search/keyword/autocomplete`,
    reqParam
  );
}

function* loadKeywordSearchData(action) {
  yield put(clearAutoCompleteDataAction());
  yield put(startLoading());
  try {
    console.log('keyword search', action.data);
    if (action.data.keyword.length !== 0) {
      const result = yield call(searchKeywordResultAPI, action.data);
      console.log(result);
      yield put(loadDataSuccessAction(result.data.result));
      yield put(setResultTotalPage(result.data.totalPageCount));
    }
  } catch (e) {
    console.error(e);
    yield put(loadDataFailureAction(e));
  }
  yield put(finishLoading());
}

function* loadAutoCompleteData(action) {
  try {
    console.log(action, action.data.length, 'action.data.length');
    if (action.data.length !== 0) {
      const result = yield call(searchKeywordAutoCompleteAPI, action.data);
      console.log('auto api result', result);
      yield put(loadAutoCompleteDataSuccessAction(result.data));
    }
  } catch (e) {
    console.error(e);
    yield put(loadDataFailureAction(e));
  }
}

function* watchSearchResultData() {
  yield takeLatest(SET_REQUEST_DATA, loadKeywordSearchData);
}

function* watchAutoCompleteData() {
  yield debounce(delay, SET_AUTO_COMPLETE_KEYWORD, loadAutoCompleteData);
}

export default function* searchKeyword() {
  yield all([fork(watchSearchResultData), fork(watchAutoCompleteData)]);
}

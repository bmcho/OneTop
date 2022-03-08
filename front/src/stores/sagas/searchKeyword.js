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
} from '../modules/searchKeyword';
import { finishLoading, startLoading } from '../modules/loading';

const delay = 500;

function searchKeywordResultAPI(data) {
  console.log('keyword saga', data);
  const reqParam = {
    keyword: data,
    searchResultType: 'product',
    requestPage: 0,
    maxItemCountByPage: 10,
    sort: 'name asc',
  };
  return axios.post('http://localhost/api/search/keyword', reqParam);
}

function searchKeywordAutoCompleteAPI(data) {
  console.log('saga', data);
  const reqParam = {
    keyword: data,
  };
  return axios.post(
    `http://localhost/api/search/keyword/autocomplete`,
    reqParam
  );
}

function* loadKeywordSearchData(action) {
  yield put(clearAutoCompleteDataAction());
  yield put(startLoading());
  try {
    console.log(action.data);
    if (action.data.length !== 0) {
      const result = yield call(searchKeywordResultAPI, action.data);
      console.log(result);
      yield put(loadDataSuccessAction(result.data.result));
    }
  } catch (e) {
    console.error(e);
    yield put(loadDataFailureAction(e));
  }
  yield put(finishLoading());
}

function* loadAutoCompleteData(action) {
  try {
    console.log(action);
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
  yield takeLatest(SET_SEARCH_KEYWORD, loadKeywordSearchData);
}

function* watchAutoCompleteData() {
  yield debounce(delay, SET_AUTO_COMPLETE_KEYWORD, loadAutoCompleteData);
}

export default function* searchKeyword() {
  yield all([fork(watchSearchResultData), fork(watchAutoCompleteData)]);
}

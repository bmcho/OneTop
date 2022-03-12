import {
  all,
  fork,
  takeLatest,
  call,
  put,
  select,
  debounce,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  loadAutoCompleteDataSuccessAction,
  loadDataFailureAction,
  loadDataSuccessAction,
  SET_AUTO_COMPLETE_KEYWORD,
  clearAutoCompleteDataAction,
  SET_REQUEST_DATA,
} from '../modules/searchKeyword';
import { finishLoading, startLoading } from '../modules/loading';

const delay = 500;

function searchKeywordResultAPI(data) {
  return axios.post(`${process.env.BASE_URL}/search/keyword`, data);
}

function searchKeywordAutoCompleteAPI(data) {
  const reqParam = {
    keyword: data,
  };
  return axios.post(
    `${process.env.BASE_URL}/search/keyword/autocomplete`,
    reqParam
  );
}

function* loadKeywordSearchData() {
  yield put(clearAutoCompleteDataAction());
  yield put(startLoading());
  try {
    const keywordResultRequestData = yield select(
      (state) => state.searchKeyword.keywordResultRequestData
    );
    const result = yield call(searchKeywordResultAPI, keywordResultRequestData);
    yield put(loadDataSuccessAction(result.data));
  } catch (e) {
    console.error(e);
    yield put(loadDataFailureAction(e));
  }
  yield put(finishLoading());
}

function* loadAutoCompleteData(action) {
  try {
    if (action.data.length !== 0) {
      const result = yield call(searchKeywordAutoCompleteAPI, action.data);

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

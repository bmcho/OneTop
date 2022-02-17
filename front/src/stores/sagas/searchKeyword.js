import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { loadAutoCompleteDataSuccessAction, loadDataFailureAction, loadDataSuccessAction, SET_SEARCH_KEYWORD, LOAD_DATA_SUCCESS, SET_AUTO_COMPLETE_KEYWORD } from '../modules/searchKeyword';

function loadTvShowAPI(data) {
  return axios.get(`https://api.tvmaze.com/search/shows?q=${data}`);
};

function* loadTvShow(action) {
  try {
    const result = yield call(loadTvShowAPI, action.data);
    yield put(loadDataSuccessAction(result.data));
  }
  catch (e) {
    console.error(e);
    yield put(loadDataFailureAction(e));
  }
};

function* loadAutoCompleteData(action) {
  try {
    const result = yield call(loadTvShowAPI, action.data);
    yield put(loadAutoCompleteDataSuccessAction(result.data));
  }
  catch (e) {
    console.error(e);
    yield put(loadDataFailureAction(e));
  }
}

function* watchAutoCompleteData() {
  yield takeLatest(SET_AUTO_COMPLETE_KEYWORD, loadAutoCompleteData);

};

function* watchSearchResultData() {
  yield takeLatest(SET_SEARCH_KEYWORD, loadTvShow);
}

export default function* searchData() {
  yield all([
    fork(watchSearchResultData),
    fork(watchAutoCompleteData),

  ]);
};

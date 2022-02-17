import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { loadDataFailureAction, loadDataSuccessAction, SET_SEARCH_KEYWORD } from '../modules/searchKeyword';

function loadTvShowAPI(data) {
  return axios.get(`https://api.tvmaze.com/search/shows?q=${data}`);
};

function* loadTvShow(action) {
  try {
    const result = yield call(loadTvShowAPI, action.data);
    console.log('saga')
    yield put(loadDataSuccessAction(result.data));
  }
  catch (e) {
    console.error(e);
    yield put(loadDataFailureAction(e));
  }
};

function* watchLoadTvShow() {
  yield takeLatest(SET_SEARCH_KEYWORD, loadTvShow);
};

export default function* searchData() {
  yield all([
    fork(watchLoadTvShow),
  ]);
};

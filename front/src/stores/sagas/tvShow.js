import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_TVSHOW_REQUEST,
  loadTvShowSuccessAction,
  loadTvShowFailureAction,
} from '../modules/tvShow';

function loadTvShowAPI(data) {
  //게시글 업로드
  return axios.get(`https://api.tvmaze.com/search/shows?q=${data}`); // data에 따라 다른 요청을 합니다.
}

function* loadTvShow(action) {
  try {
    // call로 loadTvShowAPI 를 실행합니다. 인자로 action.data를 넘깁니다. call대신 fork를 쓰면 비동기적으로 지나가버려서 result에 값이 없어서 에러가 납니다.
    const result = yield call(loadTvShowAPI, action.data);
    yield put(loadTvShowSuccessAction(result.data));
  } catch (e) {
    // put은 dispatch와 같은 역할을 합니다. 결과의 data를 Success로 보내줍니다.
    console.error(e);
    yield put(loadTvShowFailureAction(e));
  }
}

function* watchLoadTvShow() {
  // takeLatest : 한번에 많은 LOAD_TVSHOW_REQUEST가  들어오면 마지막 요청일 때만 loadTvShow 함수를 실행합니다.
  yield takeLatest(LOAD_TVSHOW_REQUEST, loadTvShow);
}

export default function* tvShowSaga() {
  yield all([
    // watchLoadTvShow를 비동기적으로 실행합니다. 밑에 더 많은 함수들을 적을 수 있어요.
    fork(watchLoadTvShow),
  ]);
}

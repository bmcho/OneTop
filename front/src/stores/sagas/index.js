import { all, call } from 'redux-saga/effects';
import tvShow from './tvShow';
import searchData from './searchKeyword';

export default function* rootSaga() {
  yield all([call(tvShow), call(searchData)]);
}

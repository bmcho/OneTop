import { all, call } from 'redux-saga/effects';
import tvShow from './tvShow';
import searchData from './searchKeyword';
import { productInfoSaga } from './productInfo';

export default function* rootSaga() {
  yield all([call(tvShow), call(searchData), productInfoSaga()]);
}

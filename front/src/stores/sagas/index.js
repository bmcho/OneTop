import { all, call } from 'redux-saga/effects';
import tvShow from './tvShow';
import searchData from './searchKeyword';
import productInfo from './productInfo';
import productCompareInfo from './productCompareInfo';
import productInfoByCategory from './searchCategory';

export default function* rootSaga() {
  yield all([
    call(tvShow),
    call(searchData),
    call(productInfo),
    call(productCompareInfo),
    call(productInfoByCategory),
  ]);
}

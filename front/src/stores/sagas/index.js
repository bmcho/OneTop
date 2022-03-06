import { all, call } from 'redux-saga/effects';
import tvShow from './tvShow';
import searchKeyword from './searchKeyword';
import searchIngredient from './searchIngredient';
import productInfo from './productInfo';
import productCompareInfo from './productCompareInfo';
import productInfoByCategory from './searchCategory';

export default function* rootSaga() {
  yield all([
    call(tvShow),
    call(searchKeyword),
    call(searchIngredient),
    call(productInfo),
    call(productCompareInfo),
    call(productInfoByCategory),
  ]);
}

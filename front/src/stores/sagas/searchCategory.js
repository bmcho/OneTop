import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  GET_PRODUCT_INFO_BY_CATEGORY,
  GET_PRODUCT_INFO_BY_CATEGORY_SUCCESS,
  GET_PRODUCT_INFO_BY_CATEGORY_FAILURE,
  getProductInfoByCategoryAction,
  getProductInfoByCategorySuccessAction,
  getProductInfoByCategoryFailureAction,
} from '../modules/searchCategory';

const getProductInfoByCategoryAPI = async (body) => {
  const res = await axios.post(`${process.env.BASE_URL}/search/category`, body);

  return res.data;
};

function* loadProductInfoByCategory(action) {
  const { params } = action;
  try {
    const productInfoList = yield call(getProductInfoByCategoryAPI, params);
    yield put(getProductInfoByCategorySuccessAction(productInfoList));
  } catch (e) {
    yield put(getProductInfoByCategoryFailureAction(e));
  }
}

function* watchLoadProductInfoByCategory() {
  yield takeLatest(GET_PRODUCT_INFO_BY_CATEGORY, loadProductInfoByCategory);
}

export default function* productInfoByCategorySaga() {
  yield all([fork(watchLoadProductInfoByCategory)]);
}

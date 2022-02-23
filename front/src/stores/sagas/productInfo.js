import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_PRODUCT_INFO,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_FAILURE,
  getProductInfoAction,
} from '../modules/productInfo';

const getProductInfoApi = async (id) => {
  const res = await axios.get(`http://localhost:3004/item/${id}`);
  return res.data;
};

function* loadProductInfo(action) {
  const { id } = action;
  try {
    const productInfo = yield call(getProductInfoApi, id);
    yield put({ type: GET_PRODUCT_INFO_SUCCESS, payload: productInfo });
  } catch (e) {
    yield put({ type: GET_PRODUCT_INFO_FAILURE, error: e });
  }
}

export function* productInfoSaga() {
  yield takeLatest(GET_PRODUCT_INFO, loadProductInfo);
}

import axios from 'axios';
import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import {
  GET_PRODUCT_INFO,
  GET_PRODUCT_INFO_SUCCESS,
  GET_PRODUCT_INFO_FAILURE,
  getProductInfoAction,
  getProductInfoSuccessAction,
  getProductInfoFailureAction,
} from '../modules/productInfo';

const getProductInfoApi = async (id) => {
<<<<<<< HEAD
  const res = await axios.get(`http://localhost:3004/item/${id}`);
=======
  const res = await axios.get(`${process.env.BASE_URL}/detail/${id}`);
>>>>>>> 1a114de9b77e9d64305ad3b8d4cde2bcc1e1b1fc
  return res.data;
};

function* loadProductInfo(action) {
  const { id } = action;
  try {
    const productInfo = yield call(getProductInfoApi, id);
    yield put(getProductInfoSuccessAction(productInfo));
  } catch (e) {
    yield put(getProductInfoFailureAction(e));
  }
}

function* watchLoadProductInfo() {
  yield takeLatest(GET_PRODUCT_INFO, loadProductInfo);
}

export default function* productInfoSaga() {
  yield all([fork(watchLoadProductInfo)]);
}

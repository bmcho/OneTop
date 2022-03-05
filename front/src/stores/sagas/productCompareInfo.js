import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import {
  ADD_PRODUCT_COMPARE_INFO,
  ADD_PRODUCT_COMPARE_INFO_SUCCESS,
  ADD_PRODUCT_COMPARE_INFO_FAILURE,
  addProductCompareInfoAction,
  addProductCompareInfoSuccessAction,
  addProductCompareInfoFailureAction,
} from '../modules/productCompareInfo';
import axios from 'axios';

const getProductCompareInfoApi = async (id) => {
  const res = await axios.get(`http://localhost/api/detail/${id}`);
  return res.data;
};

function* loadProductCompareInfo(action) {
  const { id } = action;
  try {
    const compareInfo = yield call(getProductCompareInfoApi, id);
    yield put(
      addProductCompareInfoSuccessAction({ ...compareInfo, checked: false })
    );
  } catch (e) {
    yield put(addProductCompareInfoFailureAction(e));
  }
}

function* watchLoadProductCompareInfo() {
  yield takeLatest(ADD_PRODUCT_COMPARE_INFO, loadProductCompareInfo);
}

export default function* productCompareInfoSaga() {
  yield all([fork(watchLoadProductCompareInfo)]);
}

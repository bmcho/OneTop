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
<<<<<<< HEAD
  const res = await axios.get(`http://localhost:3004/item/${id}`);
=======
  const res = await axios.get(`${process.env.BASE_URL}/detail/${id}`);
>>>>>>> 1a114de9b77e9d64305ad3b8d4cde2bcc1e1b1fc
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

import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  GET_PRODUCT_REVIEW,
  getProductReviewSuccessAction,
  getProductReviewFailureAction,
  POST_PRODUCT_REVIEW,
  postProductReviewSuccessAction,
  postProductReviewFailureAction,
  MODIFY_PRODUCT_REVIEW,
  modifyProductReviewSuccessAction,
  modifyProductReviewFailureAction,
  DELETE_PRODUCT_REVIEW,
  deleteProductReviewSuccessAction,
  deleteProductReviewFailureAction,
} from '../modules/productReview';

const getProductReviewApi = async (productNum, page) => {
  const res = await axios.get(
    `${process.env.BASE_URL}/reviews/${productNum}?page=${page}`
  );
  return res.data;
};
const postProductReviewApi = async (body) => {
  const res = await axios.post(`${process.env.BASE_URL}/reviews`, body);
  return res.data;
};

const deleteProductReviewApi = async (body) => {
  const res = await axios.delete(`${process.env.BASE_URL}/reviews`, {
    data: body,
  });
  return res.data;
};

function* loadProductReview(action) {
  const { id, page } = action;
  try {
    const reviews = yield call(getProductReviewApi, id, page);
    yield put(getProductReviewSuccessAction(reviews));
  } catch (e) {
    yield put(getProductReviewFailureAction(e));
  }
}

function* createProductReview(action) {
  const { body } = action;
  try {
    const reviews = yield call(postProductReviewApi, body);
    yield put(postProductReviewSuccessAction(reviews));
  } catch (e) {
    yield put(postProductReviewFailureAction(e));
  }
}

function* modifyProductReview(action) {
  const { body } = action;
  try {
    const result = yield call(postProductReviewApi, body);
    yield put(modifyProductReviewSuccessAction(result));
  } catch (e) {
    yield put(modifyProductReviewFailureAction(e));
  }
}

function* deleteProductReview(action) {
  const { body } = action;
  try {
    const result = yield call(deleteProductReviewApi, body);
    yield put(deleteProductReviewSuccessAction(result));
  } catch (e) {
    yield put(deleteProductReviewFailureAction(e));
  }
}

function* watchLoadProductReview() {
  yield takeLatest(GET_PRODUCT_REVIEW, loadProductReview);
}

function* watchCreateProductReview() {
  yield takeLatest(POST_PRODUCT_REVIEW, createProductReview);
}

function* watchModifyProductReview() {
  yield takeLatest(MODIFY_PRODUCT_REVIEW, modifyProductReview);
}

function* watchDeleteProductReview() {
  yield takeLatest(DELETE_PRODUCT_REVIEW, deleteProductReview);
}

export default function* productReviewSaga() {
  yield all([fork(watchLoadProductReview)]);
  yield all([fork(watchCreateProductReview)]);
  yield all([fork(watchModifyProductReview)]);
  yield all([fork(watchDeleteProductReview)]);
}

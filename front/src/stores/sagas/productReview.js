import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  GET_PRODUCT_REVIEW,
  GET_PRODUCT_REVIEW_SUCCESS,
  GET_PRODUCT_REVIEW_FAILURE,
  getProductReviewAction,
  getProductReviewSuccessAction,
  getProductReviewFailureAction,
  POST_PRODUCT_REVIEW,
  POST_PRODUCT_REVIEW_SUCCESS,
  POST_PRODUCT_REVIEW_FAILURE,
  postProductReviewAction,
  postProductReviewSuccessAction,
  postProductReviewFailureAction,
} from '../modules/productReview';

const getProductReviewApi = async (productNum, page) => {
  const res = await axios.get(`${process.env.BASE_URL}/reviews/${productNum}`);
  return res.data;
};
const postPoductReviewApi = async (body) => {
  const res = await axios.post(`${process.env.BASE_URL}/reviews`, body);
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
    const reviews = yield call(postPoductReviewApi, body);
    yield put(postProductReviewSuccessAction(reviews));
  } catch (e) {
    yield put(postProductReviewFailureAction(e));
  }
}

function* watchLoadProductReview() {
  yield takeLatest(GET_PRODUCT_REVIEW, loadProductReview);
}

function* watchCreateProductReview() {
  yield takeLatest(POST_PRODUCT_REVIEW, createProductReview);
}

export default function* productReviewSaga() {
  yield all([fork(watchLoadProductReview)]);
  yield all([fork(watchCreateProductReview)]);
}

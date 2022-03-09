import axios from 'axios';
import {
  GET_KEYWORDS,
  getKeywordsFailureAction,
  getKeywordsSuccessAction,
  GET_ROCOMMENDED,
  getRecommendedFailureAction,
  getRecommendedSuccessAction,
} from '../modules/productRecommend';
import { call, put, takeLatest, all, fork } from 'redux-saga/effects';

const getKeywordsApi = async (category) => {
  const res = await axios.get(`${process.env.BASE_URL}/main/${category}`);
  return res.data;
};

const getRecomendedApi = async (category, keywords) => {
  const res = await axios.post(`${process.env.BASE_URL}/main/recommandList`, {
    category,
    keywords,
  });
  return res.data;
};

function* loadKeywords(action) {
  const { category } = action;
  try {
    const keywords = yield call(getKeywordsApi, category);
    yield put(getKeywordsSuccessAction(keywords));
  } catch (e) {
    yield put(getKeywordsFailureAction(e));
  }
}

function* loadRecommended(action) {
  const { category, keywords } = action;
  try {
    const recommended = yield call(getRecomendedApi, category, keywords);
    yield put(getRecommendedSuccessAction(recommended));
  } catch (e) {
    yield put(getRecommendedFailureAction(e));
  }
}

function* watchLoadKeywords() {
  yield takeLatest(GET_KEYWORDS, loadKeywords);
}

function* watchLoadRecommended() {
  yield takeLatest(GET_ROCOMMENDED, loadRecommended);
}

export default function* productRecommendSaga() {
  yield all([fork(watchLoadKeywords)]);
  yield all([fork(watchLoadRecommended)]);
}

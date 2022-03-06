import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { finishLoading, startLoading } from '../modules/loading';
import {
  SET_SEARCH_INGREDIENT,
  loadDataSuccessAction,
  loadDataFailureAction,
} from '../modules/searchIngredient';
function searchIngredientResultAPI(data) {
  return axios.post('http://localhost/api/search/ingredient', data);
}
// function loadTvShowAPI(data) {
//   return axios.get(`https://api.tvmaze.com/search/shows?q=${data}`);
// }

function* loadSearchIngredientResult(action) {
  yield put(startLoading());
  try {
    const result = yield call(searchIngredientResultAPI, action.data);
    yield put(loadDataSuccessAction(result.data.result));
  } catch (e) {
    console.error(e);
    yield put(loadDataFailureAction(e));
  }
  yield put(finishLoading());
}

// function* loadAutoCompleteData(action) {
//   try {
//     const result = yield call(loadTvShowAPI, action.data);
//     yield put(loadAutoCompleteDataSuccessAction(result.data));
//   } catch (e) {
//     console.error(e);
//     yield put(loadDataFailureAction(e));
//   }
// }

// function* watchAutoCompleteData() {
//   yield takeLatest(SET_AUTO_COMPLETE_KEYWORD, loadAutoCompleteData);
// }

function* watchSearchResultData() {
  yield takeLatest(SET_SEARCH_INGREDIENT, loadSearchIngredientResult);
}

export default function* searchIngredient() {
  yield all([fork(watchSearchResultData)]);
}

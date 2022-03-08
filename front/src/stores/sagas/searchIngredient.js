import { all, fork, takeLatest, call, put, debounce } from 'redux-saga/effects';
import axios from 'axios';
import { finishLoading, startLoading } from '../modules/loading';
import {
  SET_INGREDIENT_FOR_SEARCH,
  SET_INGREDIENT_AUTO_COMPLETE_KEYWORD,
  loadIngredientDataSuccessAction,
  loadIngredientDataFailureAction,
  loadIngredientAutoCompleteDataSuccessAction,
  SET_INCLUDE_AUTO_COMPLETE_KEYWORD,
  LOAD_INCLUDE_AUTO_COMPLETE_DATA_SUCCESS,
  loadIncludeAutoCompleteDataSuccessAction,
} from '../modules/searchIngredient';

const delay = 500;

function searchIngredientResultAPI(data) {
  return axios.post('http://localhost/api/search/ingredient', data);
}
function searchIngredientAutoCompleteAPI(data) {
  const reqParam = {
    keyword: data,
  };
  return axios.post(
    `http://localhost/api/search/ingredient/autocomplete`,
    reqParam
  );
}

function* loadSearchIngredientResult(action) {
  console.log('saga', action);

  yield put(startLoading());
  try {
    const result = yield call(searchIngredientResultAPI, action.params);
    yield put(loadIngredientDataSuccessAction(result.data.result));
  } catch (e) {
    console.error(e);
    yield put(loadIngredientDataFailureAction(e));
  }
  yield put(finishLoading());
}

function* loadAutoCompleteData(action) {
  console.log('auto saga', action);
  try {
    if (action.data.length !== 0) {
      const result = yield call(searchIngredientAutoCompleteAPI, action.data);
      console.log(result, 'gogo auto result');
      yield put(
        loadIncludeAutoCompleteDataSuccessAction(result.data.ingredientList)
      );
    }
  } catch (e) {
    console.error(e);
    yield put(loadIngredientDataFailureAction(e));
  }
}

function* watchIngredientSearchResultData() {
  yield takeLatest(SET_INGREDIENT_FOR_SEARCH, loadSearchIngredientResult);
}

function* watchIngredientAutoCompleteData() {
  yield debounce(
    delay,
    SET_INCLUDE_AUTO_COMPLETE_KEYWORD,
    loadAutoCompleteData
  );
}

export default function* searchIngredient() {
  yield all([
    fork(watchIngredientSearchResultData),
    fork(watchIngredientAutoCompleteData),
  ]);
}

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
  SET_EXCLUDE_AUTO_COMPLETE_KEYWORD,
  loadExcludeAutoCompleteDataSuccessAction,
} from '../modules/searchIngredient';

const delay = 500;

function searchIngredientResultAPI(data) {
  return axios.post(`${process.env.BASE_URL}/search/ingredient`, data);
}

function searchIngredientAutoCompleteAPI(data) {
  const reqParam = {
    keyword: data,
  };
  return axios.post(
    `${process.env.BASE_URL}/search/ingredient/autocomplete`,
    reqParam
  );
}

//load data
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

//load auto
function* loadIncludeAutoCompleteData(action) {
  console.log('auto saga', action);
  try {
    if (action.data.length !== 0) {
      const result = yield call(searchIngredientAutoCompleteAPI, action.data);
      console.log(result, 'include auto result');
      yield put(
        loadIncludeAutoCompleteDataSuccessAction(result.data.ingredientList)
      );
    }
  } catch (e) {
    console.error(e);
    yield put(loadIngredientDataFailureAction(e));
  }
}

function* loadExcludeAutoCompleteData(action) {
  console.log('auto saga', action);
  try {
    if (action.data.length !== 0) {
      const result = yield call(searchIngredientAutoCompleteAPI, action.data);
      console.log(result, 'exclude auto result');
      yield put(
        loadExcludeAutoCompleteDataSuccessAction(result.data.ingredientList)
      );
    }
  } catch (e) {
    console.error(e);
    yield put(loadIngredientDataFailureAction(e));
  }
}

// watch data
function* watchIngredientSearchResultData() {
  yield takeLatest(SET_INGREDIENT_FOR_SEARCH, loadSearchIngredientResult);
}

//watch auto
function* watchIncludeAutoCompleteData() {
  yield debounce(
    delay,
    SET_INCLUDE_AUTO_COMPLETE_KEYWORD,
    loadIncludeAutoCompleteData
  );
}
function* watchExcludeAutoCompleteData() {
  yield debounce(
    delay,
    SET_EXCLUDE_AUTO_COMPLETE_KEYWORD,
    loadExcludeAutoCompleteData
  );
}

export default function* searchIngredient() {
  yield all([
    fork(watchIngredientSearchResultData),
    fork(watchIncludeAutoCompleteData),
    fork(watchExcludeAutoCompleteData),
  ]);
}

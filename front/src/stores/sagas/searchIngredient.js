import {
  all,
  fork,
  takeLatest,
  call,
  put,
  debounce,
  select,
} from 'redux-saga/effects';
import axios from 'axios';
import { finishLoading, startLoading } from '../modules/loading';
import {
  SET_RESULT_REQUEST_PARAMS_SEARCH,
  SET_INGREDIENT_AUTO_COMPLETE_KEYWORD,
  loadIngredientDataSuccessAction,
  loadIngredientDataFailureAction,
  loadIngredientAutoCompleteDataSuccessAction,
  SET_INCLUDE_AUTO_COMPLETE_KEYWORD,
  LOAD_INCLUDE_AUTO_COMPLETE_DATA_SUCCESS,
  loadIncludeAutoCompleteDataSuccessAction,
  SET_EXCLUDE_AUTO_COMPLETE_KEYWORD,
  loadExcludeAutoCompleteDataSuccessAction,
  SET_INGREDIENT_IN_REQUEST_PARAMS,
  SET_PAGE_IN_REQUEST_PARAMS,
  SET_SORT_IN_REQUEST_PARAMS,
} from '../modules/searchIngredient';

const delay = 500;

function searchIngredientResultAPI(origin, change) {
  const reqParam = {
    ...origin,
    ...change,
  };
  return axios.post(`${process.env.BASE_URL}/search/ingredient`, reqParam);
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
    const resultRequestParams = yield select(
      (state) => state.searchIngredient.resultRequestParams
    );
    console.log('resultRequestParams', resultRequestParams);
    const result = yield call(
      searchIngredientResultAPI,
      resultRequestParams,
      action.change
    );
    yield put(loadIngredientDataSuccessAction(result.data));
    // yield put(loadIngredientDataSuccessAction(result.data.result));
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
// function* watchIngredientForResultData() {
//   yield takeLatest(
//     SET_RESULT_REQUEST_PARAMS_SEARCH,
//     loadSearchIngredientResult
//   );
// }

function* watchIngredientFortSearchResultData() {
  yield takeLatest(
    SET_INGREDIENT_IN_REQUEST_PARAMS,
    loadSearchIngredientResult
  );
}
function* watchPageFortSearchResultData() {
  yield takeLatest(SET_PAGE_IN_REQUEST_PARAMS, loadSearchIngredientResult);
}
function* watchSortForSearchResultData() {
  yield takeLatest(SET_SORT_IN_REQUEST_PARAMS, loadSearchIngredientResult);
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
    // fork(watchIngredientForResultData),
    fork(watchIngredientFortSearchResultData),
    fork(watchPageFortSearchResultData),
    fork(watchSortForSearchResultData),
    fork(watchIncludeAutoCompleteData),
    fork(watchExcludeAutoCompleteData),
  ]);
}

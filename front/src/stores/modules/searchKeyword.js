export const initialState = {
  autoCompleteKeyword: '',
  searchKeyword: '',
  autoCompleteData: [],
  searchResultData: [],

  resultType: '',
  sort: '',
  requestPage: 0,

  resultTotalPage: 0,
  requestData: {},

  searchKeywordError: '',
};

export const SET_AUTO_COMPLETE_KEYWORD = 'SET_AUTO_COMPLETE_KEYWORD';
export const SET_SEARCH_KEYWORD = 'SET_SEARCH_KEYWORD';
export const LOAD_AUTO_COMPLETE_DATA_SUCCESS =
  'LOAD_AUTO_COMPLETE_DATA_SUCCESS';
export const CLEAR_AUTO_COMPLETE_DATA = 'CLEAR_AUTO_COMPLETE_DATA';

export const SET_RESULT_TYPE_ACTION = 'SET_RESULT_TYPE_ACTION';
export const SET_SORT_ACTION = 'SET_SORT_ACTION';
export const SET_REQUEST_PAGE = 'SET_REQUEST_PAGE';
export const SET_REQUEST_DATA = 'SET_REQUEST_DATA';
export const SET_RESULT_TOTAL_PAGE = 'SET_RESULT_TOTAL_PAGE';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';

export const setAutoCompleteKeywordAction = (data) => ({
  type: SET_AUTO_COMPLETE_KEYWORD,
  data,
});

export const setSearchKeywordAction = (data) => ({
  type: SET_SEARCH_KEYWORD,
  data,
});

export const loadAutoCompleteDataSuccessAction = (data) => ({
  type: LOAD_AUTO_COMPLETE_DATA_SUCCESS,
  data,
});

export const clearAutoCompleteDataAction = () => ({
  type: CLEAR_AUTO_COMPLETE_DATA,
});

export const setResultTypeAction = (data) => ({
  type: SET_RESULT_TYPE_ACTION,
  data,
});

export const setSortAction = (data) => ({
  type: SET_SORT_ACTION,
  data,
});

export const setRequestPageAction = (data) => ({
  type: SET_REQUEST_PAGE,
  data,
});

export const setRequestDataAction = (data) => ({
  type: SET_REQUEST_DATA,
  data,
});
export const setResultTotalPage = (data) => ({
  type: SET_RESULT_TOTAL_PAGE,
  data,
});
export const loadDataSuccessAction = (data) => ({
  type: LOAD_DATA_SUCCESS,
  data,
});

export const loadDataFailureAction = (error) => ({
  type: LOAD_DATA_FAILURE,
  error,
});

const searchKeyword = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTO_COMPLETE_KEYWORD:
      return { ...state, autoCompleteKeyword: action.data };
    case LOAD_AUTO_COMPLETE_DATA_SUCCESS:
      console.log(action.data);
      const product = action.data.productList.map((e) => {
        return { type: 'product', data: e };
      });
      const brand = action.data.brandList.map((e) => {
        return { type: 'brand', data: e };
      });
      const ingredient = action.data.ingredientList.map((e) => {
        return { type: 'ingredient', data: e };
      });
      const result = [...product, ...brand, ...ingredient];
      // console.log(result);
      return { ...state, autoCompleteData: result };
    case CLEAR_AUTO_COMPLETE_DATA:
      return { ...state, autoCompleteData: [] };
    case SET_SEARCH_KEYWORD:
      return { ...state, searchKeyword: action.data };
    case SET_REQUEST_PAGE:
      return { ...state, requestPage: action.data };
    case SET_REQUEST_DATA:
      return { ...state, requestData: action.data };
    case SET_RESULT_TYPE_ACTION:
      return { ...state, resultType: action.data };
    case SET_SORT_ACTION:
      return { ...state, sort: action.data };
    case SET_RESULT_TOTAL_PAGE:
      return { ...state, resultTotalPage: action.data };
    case LOAD_DATA_SUCCESS:
      return { ...state, searchResultData: action.data };
    case LOAD_DATA_FAILURE:
      return { ...state, searchKeywordError: action.error };
    default:
      return state;
  }
};

export default searchKeyword;

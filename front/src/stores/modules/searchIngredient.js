export const initialState = {
  searchIngredient: {},
  searchResultData: [],
  autoCompleteKeyword: '',
  autoCompleteData: [],
  searchKeywordError: '',
};

export const SET_SEARCH_INGREDIENT = 'SET_SEARCH_INGREDIENT';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';

export const SET_AUTO_COMPLETE_KEYWORD = 'SET_AUTO_COMPLETE_KEYWORD';
export const LOAD_AUTO_COMPLETE_DATA_SUCCESS =
  'LOAD_AUTO_COMPLETE_DATA_SUCCESS';
export const CLEAR_AUTO_COMPLETE_DATA = 'CLEAR_AUTO_COMPLETE_DATA';

export const setSearchIngredientAction = (data) => ({
  type: SET_SEARCH_INGREDIENT,
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

export const setAutoCompleteKeywordAction = (data) => ({
  type: SET_AUTO_COMPLETE_KEYWORD,
  data,
});

export const loadAutoCompleteDataSuccessAction = (data) => ({
  type: LOAD_AUTO_COMPLETE_DATA_SUCCESS,
  data,
});

export const clearAutoCompleteDataAction = () => ({
  type: CLEAR_AUTO_COMPLETE_DATA,
});

const searchIngredient = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_INGREDIENT:
      return { ...state, searchIngredient: action.data };
    case LOAD_DATA_SUCCESS:
      return { ...state, searchResultData: action.data };
    case LOAD_DATA_FAILURE:
      return { ...state, searchKeywordError: action.error };
    default:
      return state;
  }
};
export default searchIngredient;

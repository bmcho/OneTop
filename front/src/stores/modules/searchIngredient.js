export const initialState = {
  searchIngredient: {},
  searchIngredientResultData: [],
  autoCompleteKeyword: '',
  autoCompleteData: [],
  searchIngredientError: '',
};

export const SET_INGREDIENT_FOR_SEARCH = 'SET_INGREDIENT_FOR_SEARCH';
export const LOAD_INGREDIENT_DATA_SUCCESS = 'LOAD_INGREDIENT_DATA_SUCCESS';
export const LOAD_INGREDIENT_DATA_FAILURE = 'LOAD_INGREDIENT_DATA_FAILURE';

export const SET_INGREDIENT_AUTO_COMPLETE_KEYWORD =
  'SET_INGREDIENT_AUTO_COMPLETE_KEYWORD';
export const LOAD_INGREDIENT_AUTO_COMPLETE_DATA_SUCCESS =
  'LOAD_INGREDIENT_AUTO_COMPLETE_DATA_SUCCESS';
export const CLEAR_INGREDIENT_AUTO_COMPLETE_DATA =
  'CLEAR_INGREDIENT_AUTO_COMPLETE_DATA';

export const setIngredientForSearchAction = (params) => ({
  type: SET_INGREDIENT_FOR_SEARCH,
  params,
});

export const loadIngredientDataSuccessAction = (data) => ({
  type: LOAD_INGREDIENT_DATA_SUCCESS,
  data,
});

export const loadIngredientDataFailureAction = (error) => ({
  type: LOAD_INGREDIENT_DATA_FAILURE,
  error,
});

export const setInGredientAutoCompleteKeywordAction = (data) => ({
  type: SET_INGREDIENT_AUTO_COMPLETE_KEYWORD,
  data,
});

export const loadInGredientAutoCompleteDataSuccessAction = (data) => ({
  type: LOAD_INGREDIENT_AUTO_COMPLETE_DATA_SUCCESS,
  data,
});

export const clearIngredientAutoCompleteDataAction = () => ({
  type: CLEAR_INGREDIENT_AUTO_COMPLETE_DATA,
});

const searchIngredient = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_FOR_SEARCH:
      return { ...state, searchIngredient: action.data };
    case LOAD_INGREDIENT_DATA_SUCCESS:
      return { ...state, searchIngredientResultData: action.data };
    case LOAD_INGREDIENT_DATA_FAILURE:
      return { ...state, searchIngredientError: action.error };
    default:
      return state;
  }
};
export default searchIngredient;

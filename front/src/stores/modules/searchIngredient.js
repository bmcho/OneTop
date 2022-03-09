export const initialState = {
  searchIngredient: {},
  searchIngredientResultData: [],
  ingredientAutoCompleteKeyword: '',
  ingredientAutoCompleteData: [],
  includeAutoCompleteKeyword: '',
  excludeAutoCompleteKeyword: '',
  includeAutoCompleteData: [],
  excludeAutoCompleteData: [],
  searchIngredientError: '',
};

export const SET_INGREDIENT_FOR_SEARCH = 'SET_INGREDIENT_FOR_SEARCH';
export const LOAD_INGREDIENT_DATA_SUCCESS = 'LOAD_INGREDIENT_DATA_SUCCESS';
export const LOAD_INGREDIENT_DATA_FAILURE = 'LOAD_INGREDIENT_DATA_FAILURE';

export const SET_INGREDIENT_AUTO_COMPLETE_KEYWORD =
  'SET_INGREDIENT_AUTO_COMPLETE_KEYWORD';
export const SET_INCLUDE_AUTO_COMPLETE_KEYWORD =
  'SET_INCLUDE_AUTO_COMPLETE_KEYWORD';
export const SET_EXCLUDE_AUTO_COMPLETE_KEYWORD =
  'SET_EXCLUDE_AUTO_COMPLETE_KEYWORD';

export const LOAD_INGREDIENT_AUTO_COMPLETE_DATA_SUCCESS =
  'LOAD_INGREDIENT_AUTO_COMPLETE_DATA_SUCCESS';
export const LOAD_INCLUDE_AUTO_COMPLETE_DATA_SUCCESS =
  'LOAD_INCLUDE_AUTO_COMPLETE_DATA_SUCCESS';
export const LOAD_EXCLUDE_AUTO_COMPLETE_DATA_SUCCESS =
  'LOAD_EXCLUDE_AUTO_COMPLETE_DATA_SUCCESS';

export const CLEAR_INGREDIENT_AUTO_COMPLETE_DATA =
  'CLEAR_INGREDIENT_AUTO_COMPLETE_DATA';
export const CLEAR_INCLUDE_AUTO_COMPLETE_DATA =
  'CLEAR_INCLUDE_AUTO_COMPLETE_DATA';

export const CLEAR_EXCLUDE_AUTO_COMPLETE_DATA =
  'CLEAR_EXCLUDE_AUTO_COMPLETE_DATA';

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

//set auto keyword
export const setIncludeAutoCompleteKeywordAction = (data) => ({
  type: SET_INCLUDE_AUTO_COMPLETE_KEYWORD,
  data,
});
export const setExcludeAutoCompleteKeywordAction = (data) => ({
  type: SET_EXCLUDE_AUTO_COMPLETE_KEYWORD,
  data,
});

//load auto data
export const loadIngredientAutoCompleteDataSuccessAction = (data) => ({
  type: LOAD_INGREDIENT_AUTO_COMPLETE_DATA_SUCCESS,
  data,
});
export const loadIncludeAutoCompleteDataSuccessAction = (data) => ({
  type: LOAD_INCLUDE_AUTO_COMPLETE_DATA_SUCCESS,
  data,
});
export const loadExcludeAutoCompleteDataSuccessAction = (data) => ({
  type: LOAD_EXCLUDE_AUTO_COMPLETE_DATA_SUCCESS,
  data,
});

//clear auto data
export const clearIncludeAutoCompleteDataAction = () => ({
  type: CLEAR_INCLUDE_AUTO_COMPLETE_DATA,
});
export const clearExcludeAutoCompleteDataAction = () => ({
  type: CLEAR_EXCLUDE_AUTO_COMPLETE_DATA,
});

const searchIngredient = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_FOR_SEARCH:
      return { ...state, searchIngredient: action.data };
    case LOAD_INGREDIENT_DATA_SUCCESS:
      return { ...state, searchIngredientResultData: action.data };
    case LOAD_INGREDIENT_DATA_FAILURE:
      return { ...state, searchIngredientError: action.error };
    case SET_INGREDIENT_AUTO_COMPLETE_KEYWORD:
      console.log(action.data, 'action ');
      return { ...state, ingredientAutoCompleteKeyword: action.data };

    case SET_INCLUDE_AUTO_COMPLETE_KEYWORD:
      return { ...state, includeAutoCompleteKeyword: action.data };
    case SET_EXCLUDE_AUTO_COMPLETE_KEYWORD:
      return { ...state, excludeAutoCompleteKeyword: action.data };

    case LOAD_INCLUDE_AUTO_COMPLETE_DATA_SUCCESS:
      console.log(action.data, 'action list');
      return {
        ...state,
        includeAutoCompleteData: action.data,
      };
    case LOAD_EXCLUDE_AUTO_COMPLETE_DATA_SUCCESS:
      console.log(action.data, 'action list');
      return {
        ...state,
        excludeAutoCompleteData: action.data,
      };

    case CLEAR_INCLUDE_AUTO_COMPLETE_DATA:
      return { ...state, includeAutoCompleteData: [] };
    case CLEAR_EXCLUDE_AUTO_COMPLETE_DATA:
      return { ...state, excludeAutoCompleteData: [] };
    default:
      return state;
  }
};
export default searchIngredient;

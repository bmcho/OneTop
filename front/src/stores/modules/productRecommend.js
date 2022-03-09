const initialState = {
  category: '',
  keywords: {
    loading: false,
    data: null,
    error: null,
  },
  selectKeywords: [],
  recommended: {
    loading: false,
    data: null,
    error: null,
  },
};

export const SET_CATEGORY = 'SET_CATEGORY';

export const GET_KEYWORDS = 'GET_KEYWORDS';
export const GET_KEYWORDS_SUCCESS = 'GET_KEYWORDS_SUCCESS';
export const GET_KEYWORDS_FAILURE = 'GET_KEYWORDS_FAILURE';

export const SET_SELECTED_KEYWORDS = 'SET_SELECTED_KEYWORDS';

export const GET_ROCOMMENDED = 'GET_ROCOMMENDED';
export const GET_ROCOMMENDED_SUCCESS = 'GET_ROCOMMENDED_SUCCESS';
export const GET_ROCOMMENDED_FAILURE = 'GET_ROCOMMENDED_FAILURE';

export const RECOMMEND_RESET = 'RECOMMEND_RESET';

export const setCategoryAction = (category) => ({
  type: SET_CATEGORY,
  category,
});

export const getKeywordsAction = (category) => ({
  type: GET_KEYWORDS,
  category,
});
export const getKeywordsSuccessAction = (data) => ({
  type: GET_KEYWORDS_SUCCESS,
  data,
});
export const getKeywordsFailureAction = (error) => ({
  type: GET_KEYWORDS_FAILURE,
  error,
});

export const setSelectedKeywordsAction = (keywords) => ({
  type: SET_SELECTED_KEYWORDS,
  keywords,
});

export const getRecommendedAction = (category, keywords) => ({
  type: GET_ROCOMMENDED,
  category,
  keywords,
});
export const getRecommendedSuccessAction = (data) => ({
  type: GET_ROCOMMENDED_SUCCESS,
  data,
});
export const getRecommendedFailureAction = (error) => ({
  type: GET_ROCOMMENDED_FAILURE,
  error,
});

export const recommendedResetAction = () => ({
  type: RECOMMEND_RESET,
});

const productRecommend = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case GET_KEYWORDS:
      return {
        ...state,
        keywords: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_KEYWORDS_SUCCESS:
      return {
        ...state,
        keywords: {
          loading: false,
          data: action.data,
          error: null,
        },
      };
    case GET_KEYWORDS_FAILURE:
      return {
        ...state,
        keywords: {
          loading: false,
          data: null,
          error: action.error,
        },
      };
    case SET_SELECTED_KEYWORDS:
      return {
        ...state,
        selectKeywords: action.keywords,
      };
    case GET_ROCOMMENDED:
      return {
        ...state,
        recommended: {
          loading: true,
          data: [],
          error: null,
        },
      };
    case GET_ROCOMMENDED_SUCCESS:
      return {
        ...state,
        recommended: {
          loading: false,
          data: action.data,
          error: null,
        },
      };
    case GET_ROCOMMENDED_FAILURE:
      return {
        ...state,
        recommended: {
          loading: false,
          data: [],
          error: action.error,
        },
      };
    case RECOMMEND_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default productRecommend;

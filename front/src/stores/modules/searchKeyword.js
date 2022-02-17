export const initialState = {
  searchKeyword: '',
  searchResultData: [],
  searchKeywordError: ''
}

export const SET_SEARCH_KEYWORD = 'SET_SEARCH_KEYWORD';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';

export const setSearchKeywordAction = (data) => ({
  type: SET_SEARCH_KEYWORD,
  data,
});
export const loadDataSuccessAction = (data) => ({
  type: LOAD_DATA_SUCCESS,
  data,
});

export const loadDataFailureAction = (error) => ({
  type: LOAD_DATA_FAILURE,
  error
});
const searchKeyword = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_KEYWORD:
      return { ...state, searchKeyword: action.data };
    case LOAD_DATA_SUCCESS:
      const tvShows = action.data.map(tvShow => ({
        id: tvShow.show.id,
        score: tvShow.score,
        url: tvShow.show.url,
        name: tvShow.show.name,
        type: tvShow.show.type,
        language: tvShow.show.language
      }))
      return { ...state, searchResultData: tvShows };
    case LOAD_DATA_FAILURE:
      return { ...state, searchKeywordError: action.error };
    default:
      return state;
  }
};

export default searchKeyword;

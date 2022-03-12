export const initialState = {
  tapState: 'category',
};

export const SET_SEARCH_TAP_STATE = 'SET_SEARCH_TAP_STATE';

export const setSearchTapState = (data) => ({
  type: SET_SEARCH_TAP_STATE,
  data,
});

const searchTypeTap = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TAP_STATE:
      return { ...state, tapState: action.data };
    default:
      return state;
  }
};

export default searchTypeTap;

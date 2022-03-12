export const initialState = {
  loadingStatus: false,
};

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = () => ({
  type: START_LOADING,
});
export const finishLoading = () => ({
  type: FINISH_LOADING,
});

const loading = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loadingStatus: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        loadingStatus: false,
      };
    default:
      return state;
  }
};

export default loading;

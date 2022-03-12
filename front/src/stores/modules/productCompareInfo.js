const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const ADD_PRODUCT_COMPARE_INFO = 'ADD_PRODUCT_COMPARE_INFO';
export const ADD_PRODUCT_COMPARE_INFO_SUCCESS =
  'ADD_PRODUCT_COMPARE_INFO_SUCCESS';
export const ADD_PRODUCT_COMPARE_INFO_FAILURE =
  'ADD_PRODUCT_COMPARE_INFO_FAILURE';
export const REMOVE_PRODUCT_COMPARE_INFO = 'REMOVE_PRODUCT_COMPARE_INFO';
export const CHECK_PRODUCT_COMPARE_INFO = 'CHECK_PRODUCT_COMPARE_INFO';

export const addProductCompareInfoAction = (id) => ({
  type: ADD_PRODUCT_COMPARE_INFO,
  id,
});

export const addProductCompareInfoSuccessAction = (data) => ({
  type: ADD_PRODUCT_COMPARE_INFO_SUCCESS,
  data,
});

export const addProductCompareInfoFailureAction = (error) => ({
  type: ADD_PRODUCT_COMPARE_INFO_FAILURE,
  error,
});

export const removeProductCompareInfoAction = (id) => ({
  type: REMOVE_PRODUCT_COMPARE_INFO,
  id,
});

export const checkProductCompareInfoAction = () => ({
  type: CHECK_PRODUCT_COMPARE_INFO,
});

const productCompareInfo = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_COMPARE_INFO:
      return {
        loading: true,
        data: state.data,
        error: null,
      };
    case ADD_PRODUCT_COMPARE_INFO_SUCCESS:
      return {
        loading: false,
        data: state.data.concat(action.data),
        error: null,
      };
    case ADD_PRODUCT_COMPARE_INFO_FAILURE:
      return {
        loading: false,
        data: state.data,
        error: action.error,
      };
    case REMOVE_PRODUCT_COMPARE_INFO:
      return {
        ...state,
        data: state.data.filter((info) => info.product_num !== action.id),
      };
    case CHECK_PRODUCT_COMPARE_INFO:
      return {
        ...state,
        data: state.data.map((info) => ({ ...info, checked: true })),
      };
    default:
      return state;
  }
};
export default productCompareInfo;

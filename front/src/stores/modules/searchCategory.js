const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const GET_PRODUCT_INFO_BY_CATEGORY = 'GET_PRODUCT_INFO_BY_CATEGORY';
export const GET_PRODUCT_INFO_BY_CATEGORY_SUCCESS =
  'GET_PRODUCT_INFO_BY_CATEGORY_SUCCESS';
export const GET_PRODUCT_INFO_BY_CATEGORY_FAILURE =
  'GET_PRODUCT_INFO_BY_CATEGORY_FAILURE';

export const getProductInfoByCategoryAction = (params) => ({
  type: GET_PRODUCT_INFO_BY_CATEGORY,
  params,
});

export const getProductInfoByCategorySuccessAction = (data) => ({
  type: GET_PRODUCT_INFO_BY_CATEGORY_SUCCESS,
  data,
});

export const getProductInfoByCategoryFailureAction = (error) => ({
  type: GET_PRODUCT_INFO_BY_CATEGORY_FAILURE,
  error,
});

const searchCategory = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_INFO_BY_CATEGORY:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_PRODUCT_INFO_BY_CATEGORY_SUCCESS:
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case GET_PRODUCT_INFO_BY_CATEGORY_FAILURE:
      return {
        loading: false,
        data: null,
        erorr: action.error,
      };
    default:
      return state;
  }
};

export default searchCategory;

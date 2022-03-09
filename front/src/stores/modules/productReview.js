const initState = {
  get: {
    loading: false,
    reviews: null,
    error: null,
  },
  post: {
    loading: false,
    reviews: null,
    error: null,
  },
  modify: {
    loading: false,
    reviews: null,
    error: null,
  },
};

export const GET_PRODUCT_REVIEW = 'GET_PRODUCT_REVIEW';
export const GET_PRODUCT_REVIEW_SUCCESS = 'GET_PRODUCT_REVIEW_SUCCESS';
export const GET_PRODUCT_REVIEW_FAILURE = 'GET_PRODUCT_REVIEW_FAILURE';

export const POST_PRODUCT_REVIEW = 'POST_PRODUCT_REVIEW';
export const POST_PRODUCT_REVIEW_SUCCESS = 'POST_PRODUCT_REVIEW_SUCCESS';
export const POST_PRODUCT_REVIEW_FAILURE = 'POST_PRODUCT_REVIEW_FAILURE';

export const getProductReviewAction = (id) => ({
  type: GET_PRODUCT_REVIEW,
  id,
});
export const getProductReviewSuccessAction = (data) => ({
  type: GET_PRODUCT_REVIEW_SUCCESS,
  data,
});
export const getProductReviewFailureAction = (error) => ({
  type: GET_PRODUCT_REVIEW_FAILURE,
  error,
});

export const postProductReviewAction = (body) => ({
  type: POST_PRODUCT_REVIEW,
  body,
});
export const postProductReviewSuccessAction = (data) => ({
  type: POST_PRODUCT_REVIEW_SUCCESS,
  data,
});
export const postProductReviewFailureAction = (error) => ({
  type: POST_PRODUCT_REVIEW_FAILURE,
  error,
});

const productReview = (state = initState, action) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEW:
      return {
        ...state,
        get: {
          loading: true,
          reviews: null,
          error: null,
        },
      };
    case GET_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        get: {
          loading: false,
          reviews: action.data,
          error: null,
        },
      };
    case GET_PRODUCT_REVIEW_FAILURE:
      return {
        ...state,
        get: {
          loading: false,
          reviews: null,
          error: action.error,
        },
      };

    case POST_PRODUCT_REVIEW:
      return {
        ...state,
        post: {
          loading: true,
          reviews: null,
          error: null,
        },
      };
    case POST_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        post: {
          loading: false,
          reviews: action.data,
          error: null,
        },
      };
    case POST_PRODUCT_REVIEW_FAILURE:
      return {
        ...stete,
        post: {
          loading: false,
          reviews: null,
          error: null,
        },
      };
    default:
      return state;
  }
};

export default productReview;

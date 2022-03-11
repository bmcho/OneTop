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
  postImg: {
    loading: false,
    reviews: null,
    error: null,
  },
  modify: {
    loading: false,
    result: null,
    error: null,
  },
  delete: {
    loading: false,
    result: null,
    error: null,
  },
};

export const GET_PRODUCT_REVIEW = 'GET_PRODUCT_REVIEW';
export const GET_PRODUCT_REVIEW_SUCCESS = 'GET_PRODUCT_REVIEW_SUCCESS';
export const GET_PRODUCT_REVIEW_FAILURE = 'GET_PRODUCT_REVIEW_FAILURE';

export const POST_PRODUCT_REVIEW = 'POST_PRODUCT_REVIEW';
export const POST_PRODUCT_REVIEW_SUCCESS = 'POST_PRODUCT_REVIEW_SUCCESS';
export const POST_PRODUCT_REVIEW_FAILURE = 'POST_PRODUCT_REVIEW_FAILURE';

export const POST_PRODUCT_REVIEW_IMAGE = 'POST_PRODUCT_REVIEW_IMAGE';
export const POST_PRODUCT_REVIEW_IMAGE_SUCCESS =
  'POST_PRODUCT_REVIEW_IMAGE_SUCCESS';
export const POST_PRODUCT_REVIEW_IMAGE_FAILURE =
  'POST_PRODUCT_REVIEW_IMAGE_FAILURE';

export const MODIFY_PRODUCT_REVIEW = 'MODIFY_PRODUCT_REVIEW';
export const MODIFY_PRODUCT_REVIEW_SUCCESS = 'MODIFY_PRODUCT_REVIEW_SUCCESS';
export const MODIFY_PRODUCT_REVIEW_FAILURE = 'MODIFY_PRODUCT_REVIEW_FAILURE';

export const DELETE_PRODUCT_REVIEW = 'DELETE_PRODUCT_REVIEW';
export const DELETE_PRODUCT_REVIEW_SUCCESS = 'DELETE_PRODUCT_REVIEW_SUCCESS';
export const DELETE_PRODUCT_REVIEW_FAILURE = 'DELETE_PRODUCT_REVIEW_FAILURE';

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

export const postProductReviewImageAction = (files) => ({
  type: POST_PRODUCT_REVIEW_IMAGE,
  files,
});
export const postProductReviewImageSuccessAction = (result) => ({
  type: POST_PRODUCT_REVIEW_IMAGE_SUCCESS,
  result,
});
export const postProductReviewImageFailureAction = (error) => ({
  type: POST_PRODUCT_REVIEW_IMAGE_FAILURE,
  error,
});

export const modifyProductReviewAction = (body) => ({
  type: MODIFY_PRODUCT_REVIEW,
  body,
});
export const modifyProductReviewSuccessAction = (result) => ({
  type: MODIFY_PRODUCT_REVIEW_SUCCESS,
  result,
});
export const modifyProductReviewFailureAction = (error) => ({
  type: MODIFY_PRODUCT_REVIEW_FAILURE,
  error,
});

export const deleteProductReviewAction = (body) => ({
  type: DELETE_PRODUCT_REVIEW,
  body,
});
export const deleteProductReviewSuccessAction = (result) => ({
  type: DELETE_PRODUCT_REVIEW_SUCCESS,
  result,
});
export const deleteProductReviewFailureAction = (error) => ({
  type: DELETE_PRODUCT_REVIEW_FAILURE,
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
        ...state,
        post: {
          loading: false,
          reviews: null,
          error: null,
        },
      };
    case POST_PRODUCT_REVIEW_IMAGE:
      return {
        ...state,
        postImg: {
          loading: true,
          result: null,
          error: null,
        },
      };
    case POST_PRODUCT_REVIEW_IMAGE_SUCCESS:
      return {
        ...state,
        postImg: {
          loading: false,
          result: action.result,
          error: null,
        },
      };
    case POST_PRODUCT_REVIEW_IMAGE_FAILURE:
      return {
        ...state,
        postImg: {
          loading: false,
          result: null,
          error: action.error,
        },
      };
    case MODIFY_PRODUCT_REVIEW:
      return {
        ...state,
        modify: {
          loading: true,
          result: null,
          error: null,
        },
      };
    case MODIFY_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        modify: {
          loading: false,
          result: action.result,
          error: null,
        },
      };
    case MODIFY_PRODUCT_REVIEW_FAILURE:
      return {
        ...state,
        modify: {
          loading: false,
          result: null,
          error: action.error,
        },
      };
    case DELETE_PRODUCT_REVIEW:
      return {
        ...state,
        delete: {
          loading: true,
          result: null,
          error: null,
        },
      };
    case DELETE_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        delete: {
          loading: false,
          result: action.result,
          error: null,
        },
      };
    case DELETE_PRODUCT_REVIEW_FAILURE:
      return {
        ...state,
        delete: {
          loading: false,
          result: null,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default productReview;

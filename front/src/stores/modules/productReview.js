import { actionUtil } from '../../utils/reduxUtil';

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

export const MODIFY_PRODUCT_REVIEW = 'MODIFY_PRODUCT_REVIEW';
export const MODIFY_PRODUCT_REVIEW_SUCCESS = 'MODIFY_PRODUCT_REVIEW_SUCCESS';
export const MODIFY_PRODUCT_REVIEW_FAILURE = 'MODIFY_PRODUCT_REVIEW_FAILURE';

export const DELETE_PRODUCT_REVIEW = 'DELETE_PRODUCT_REVIEW';
export const DELETE_PRODUCT_REVIEW_SUCCESS = 'DELETE_PRODUCT_REVIEW_SUCCESS';
export const DELETE_PRODUCT_REVIEW_FAILURE = 'DELETE_PRODUCT_REVIEW_FAILURE';

export const getProductReviewAction = (id, page) => ({
  type: GET_PRODUCT_REVIEW,
  id,
  page,
});
export const getProductReviewSuccessAction = (payload) => ({
  type: GET_PRODUCT_REVIEW_SUCCESS,
  payload,
});
export const getProductReviewFailureAction = (error) => ({
  type: GET_PRODUCT_REVIEW_FAILURE,
  error,
});

export const postProductReviewAction = (body) => ({
  type: POST_PRODUCT_REVIEW,
  body,
});
export const postProductReviewSuccessAction = (payload) => ({
  type: POST_PRODUCT_REVIEW_SUCCESS,
  payload,
});
export const postProductReviewFailureAction = (error) => ({
  type: POST_PRODUCT_REVIEW_FAILURE,
  error,
});

export const modifyProductReviewAction = (body) => ({
  type: MODIFY_PRODUCT_REVIEW,
  body,
});
export const modifyProductReviewSuccessAction = (payload) => ({
  type: MODIFY_PRODUCT_REVIEW_SUCCESS,
  payload,
});
export const modifyProductReviewFailureAction = (error) => ({
  type: MODIFY_PRODUCT_REVIEW_FAILURE,
  error,
});

export const deleteProductReviewAction = (body) => ({
  type: DELETE_PRODUCT_REVIEW,
  body,
});
export const deleteProductReviewSuccessAction = (payload) => ({
  type: DELETE_PRODUCT_REVIEW_SUCCESS,
  payload,
});
export const deleteProductReviewFailureAction = (error) => ({
  type: DELETE_PRODUCT_REVIEW_FAILURE,
  error,
});

const productReview = (state = initState, action) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEW:
    case GET_PRODUCT_REVIEW_SUCCESS:
    case GET_PRODUCT_REVIEW_FAILURE:
      return actionUtil(GET_PRODUCT_REVIEW, 'get', 'reviews')(state, action);
    case POST_PRODUCT_REVIEW:
    case POST_PRODUCT_REVIEW_SUCCESS:
    case POST_PRODUCT_REVIEW_FAILURE:
      return actionUtil(POST_PRODUCT_REVIEW, 'post', 'reviews')(state, action);
    case MODIFY_PRODUCT_REVIEW:
    case MODIFY_PRODUCT_REVIEW_SUCCESS:
    case MODIFY_PRODUCT_REVIEW_FAILURE:
      return actionUtil(
        MODIFY_PRODUCT_REVIEW,
        'modify',
        'result'
      )(state, action);
    case DELETE_PRODUCT_REVIEW:
    case DELETE_PRODUCT_REVIEW_SUCCESS:
    case DELETE_PRODUCT_REVIEW_FAILURE:
      return actionUtil(
        DELETE_PRODUCT_REVIEW,
        'delete',
        'result'
      )(state, action);
    default:
      return state;
  }
};

export default productReview;

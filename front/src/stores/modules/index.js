import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import tvShow from './tvShow';
import searchKeyword from './searchKeyword';
import searchIngredient from './searchIngredient';
import searchTypeTap from './searchTypeTap';
import loading from './loading';
import productInfo from './productInfo';
import productCompareInfo from './productCompareInfo';
import searchCategory from './searchCategory';
import productReview from './productReview';
import productRecommend from './productRecommend';

const combineReducer = combineReducers({
  tvShow,
  searchKeyword,
  searchIngredient,
  searchTypeTap,
  loading,
  productInfo,
  productCompareInfo,
  searchCategory,
  productReview,
  productRecommend,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    default:
      return combineReducer(state, action);
  }
};

export default rootReducer;

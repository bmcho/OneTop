import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import tvShow from './tvShow';
import searchKeyword from './searchKeyword';
import searchTypeTap from './searchTypeTap';
import loading from './loading';
import productInfo from './productInfo';
import productCompareInfo from './productCompareInfo';
import searchCategory from './searchCategory';

const combineReducer = combineReducers({
  tvShow,
  searchKeyword,
  searchTypeTap,
  loading,
  productInfo,
  productCompareInfo,
  searchCategory,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    default:
      return combineReducer(state, action);
  }
};

export default rootReducer;

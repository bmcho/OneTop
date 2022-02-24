import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import tvShow from './tvShow';
import searchKeyword from './searchKeyword';
import searchTypeTap from './searchTypeTap';
import productInfo from './productInfo';

const combineReducer = combineReducers({
  tvShow,
  searchKeyword,
  searchTypeTap,
  productInfo,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    default:
      return combineReducer(state, action);
  }
};

export default rootReducer;

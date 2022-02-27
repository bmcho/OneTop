import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import tvShow from './tvShow';
import searchKeyword from './searchKeyword';
import searchTypeTap from './searchTypeTap';
import loading from './loading';

const rootReducer = (state, action) => {
  switch (action.type) {
    // 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.
    case HYDRATE:
      return { ...action.payload };
    default: {
      const combineReducer = combineReducers({
        tvShow,
        searchKeyword,
        searchTypeTap,
        loading,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;

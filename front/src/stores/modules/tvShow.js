// tvShow 전체 제목, 각각의 tvShow 내용들 에러 났을 때 담을 state들을 만들어줍니다.
export const initialState = {
  tvShowTitle: '',
  tvShowContents: [],
  loadTvShowError: '',
};

// 비동기 적인 작업을 해야하므로 요청, 성공, 실패로 액션 타입들을 만들어 줘요.
export const LOAD_TVSHOW_REQUEST = 'LOAD_TVSHOW_REQUEST';
export const LOAD_TVSHOW_SUCCESS = 'LOAD_TVSHOW_SUCCESS';
export const LOAD_TVSHOW_FAILURE = 'LOAD_TVSHOW_FAILURE';

// 액션 생성 함수입니다. data 부분이 동적으로 바뀔 수 있게 설정 해주었습니다.
export const loadTvShowRequestAction = (data) => ({
  type: LOAD_TVSHOW_REQUEST,
  data,
});

export const loadTvShowSuccessAction = (data) => ({
  type: LOAD_TVSHOW_SUCCESS,
  data,
});

export const loadTvShowFailureAction = (error) => ({
  type: LOAD_TVSHOW_FAILURE,
  error,
});

// ...은 spread 문법으로 불변성을 지키기 위해 사용 됩니다.
// 성공시에는 받아온 배열 데이터에서 필요한 부분만 새로운 배열로 만들어서 tvShowContents에 넣어주었습니다.

const tvShow = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TVSHOW_REQUEST:
      return { ...state, tvShowTitle: action.data };
    case LOAD_TVSHOW_SUCCESS:
      const tvShows = action.data.map((tvShow) => ({
        id: tvShow.show.id,
        score: tvShow.score,
        url: tvShow.show.url,
        name: tvShow.show.name,
        type: tvShow.show.type,
        language: tvShow.show.language,
      }));
      return { ...state, tvShowContents: tvShows };
    case LOAD_TVSHOW_FAILURE:
      return { ...state, loadTvShowError: action.error };
    default:
      return state;
  }
};

export default tvShow;

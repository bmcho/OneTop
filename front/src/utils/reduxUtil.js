export const actionUtil = (type, key, subKey) => {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            loading: true,
            [subKey]: null,
            error: null,
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            loading: false,
            [subKey]: action.payload,
            error: null,
          },
        };
      case FAILURE:
        return {
          ...state,
          [key]: {
            loading: false,
            [subKey]: null,
            error: action.error,
          },
        };
      default:
        return state;
    }
  };
};

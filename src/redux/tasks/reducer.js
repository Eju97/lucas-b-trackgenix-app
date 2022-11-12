import { GET_TASK_SUCCESS, GET_TASK_PENDING, GET_TASK_ERROR } from './constants';

const INITIAL_STATE = {
  isLoading: false,
  error: '',
  list: []
};
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASK_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case GET_TASK_ERROR:
      return {
        ...state,
        list: [],
        error: action.payload
      };
    case GET_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

export default reducer;

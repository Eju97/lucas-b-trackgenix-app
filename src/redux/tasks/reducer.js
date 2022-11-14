import {
  GET_TASK_SUCCESS,
  GET_TASK_PENDING,
  GET_TASK_ERROR,
  DELETE_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS
} from './constants';

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
        list: action.payload,
        isLoading: false
      };
    case GET_TASK_ERROR:
      return {
        ...state,
        list: [],
        error: action.payload,
        isLoading: false
      };
    case GET_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((tasks) => tasks._id !== action.payload)],
        error: '',
        isLoading: false
      };
    case DELETE_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        list: [],
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;

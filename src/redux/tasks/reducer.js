import {
  GET_TASK_SUCCESS,
  GET_TASK_PENDING,
  GET_TASK_ERROR,
  DELETE_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  CREATE_TASK_PENDING,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_PENDING,
  UPDATE_TASK_ERROR
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
        isLoading: false,
        error: ''
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
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        error: '',
        isLoading: false
      };
    case CREATE_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_TASK_ERROR:
      return {
        ...state,
        list: [],
        error: action.payload,
        isLoading: false
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.map((task) => {
          if (task._id === action.payload._id) {
            return action.payload;
          }
          return task;
        }),
        error: '',
        isLoading: false
      };
    case UPDATE_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_TASK_ERROR:
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

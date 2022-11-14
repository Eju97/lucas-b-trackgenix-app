import {
  GET_ADMINS_PENDING,
  GET_ADMINS_FULLFILLED,
  GET_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_FULLFILLED,
  DELETE_ADMINS_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMINS_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case DELETE_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMINS_FULLFILLED:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list.filter((admin) => admin._id !== action.payload)]
      };
    case DELETE_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    default:
      return state;
  }
};

export default reducer;

import {
  GET_ADMINS_PENDING,
  GET_ADMINS_FULLFILLED,
  GET_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_FULLFILLED,
  DELETE_ADMINS_ERROR,
  POST_ADMINS_PENDING,
  POST_ADMINS_FULLFILLED,
  POST_ADMINS_ERROR,
  PUT_ADMINS_PENDING,
  PUT_ADMINS_FULLFILLED,
  PUT_ADMINS_ERROR
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
    case POST_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_ADMINS_FULLFILLED:
      return {
        ...state,
        list: [...state.list, action.payload],
        error: '',
        isLoading: false
      };
    case POST_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case PUT_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_ADMINS_FULLFILLED:
      return {
        ...state,
        list: state.list.map((admin) => {
          if (admin._id === action.payload._id) {
            return action.payload;
          }
          return admin;
        }),
        isLoading: false,
        error: ''
      };
    case PUT_ADMINS_ERROR:
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

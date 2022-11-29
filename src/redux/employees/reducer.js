import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_PENDING,
  POST_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_ERROR,
  PUT_EMPLOYEES_PENDING,
  PUT_EMPLOYEES_SUCCESS,
  PUT_EMPLOYEES_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case DELETE_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list.filter((employee) => employee._id !== action.payload)]
      };
    case DELETE_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case POST_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list, action.payload.data]
      };
    case POST_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case PUT_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: state.list.map((employee) => {
          if (employee._id === action.payload._id) {
            return action.payload;
          }
          return employee;
        })
      };
    case PUT_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: [...state.list]
      };
    default:
      return state;
  }
};

export default reducer;

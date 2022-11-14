import {
  GET_PROJECTS_ERROR,
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  DELETE_PROJECTS_ERROR,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS,
  POST_PROJECTS_ERROR,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_SUCCESS
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case DELETE_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list.filter((project) => project._id !== action.payload)]
      };
    case DELETE_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case POST_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list, action.payload]
      };
    case POST_PROJECTS_ERROR:
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

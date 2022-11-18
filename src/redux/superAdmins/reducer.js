import {
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR,
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_PENDING,
  POST_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_ERROR,
  PUT_SUPERADMINS_PENDING,
  PUT_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: ''
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        list: []
      };
    case DELETE_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list.filter((newListItem) => newListItem._id !== action.payload)]
      };
    case DELETE_SUPERADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        list: [],
        isLoading: false
      };
    case POST_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_SUPERADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list, action.payload]
      };
    case POST_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case PUT_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_SUPERADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: state.list.map((superadmin) => {
          if (superadmin._id === action.payload._id) {
            return action.payload;
          } else {
            return superadmin;
          }
        })
      };
    case PUT_SUPERADMINS_ERROR:
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

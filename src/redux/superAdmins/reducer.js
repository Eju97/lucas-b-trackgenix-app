import {
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR,
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS
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
    default:
      return state;
  }
};

export default reducer;

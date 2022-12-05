import {
  LOGIN_PENDING,
  SET_LOGGED_IN,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  LOGOUT_PENDING,
  SET_LOGGED_OUT,
  GET_USER_ERROR,
  GET_USER_PENDING,
  GET_USER_SUCCESS
} from './constants';

const INITIAL_STATE = {
  role: null,
  email: null,
  isLoading: true,
  error: null,
  user: null,
  authenticated: false
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case GET_USER_PENDING:
    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_ERROR:
    case GET_USER_ERROR:
    case LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoading: false,
        role: action.payload.role,
        authenticated: true
      };
    case SET_LOGGED_OUT:
      return INITIAL_STATE;
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

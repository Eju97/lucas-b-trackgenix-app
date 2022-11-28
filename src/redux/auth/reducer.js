import {
  LOGIN_PENDING,
  SET_LOGGED_IN,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  LOGOUT_PENDING,
  SET_LOGGED_OUT
} from './constants';

const INITIAL_STATE = {
  role: null,
  email: null,
  isLoading: true,
  error: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_ERROR:
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
        role: action.payload.role
      };
    case SET_LOGGED_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;

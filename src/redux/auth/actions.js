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

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const setLoggedIn = (data) => {
  return {
    type: SET_LOGGED_IN,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const logoutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};

export const setLoggedOut = () => {
  return {
    type: SET_LOGGED_OUT
  };
};

export const getUserPending = () => {
  return {
    type: GET_USER_PENDING
  };
};

export const getUserError = (error) => {
  return {
    type: GET_USER_ERROR,
    payload: error
  };
};

export const getUserSuccess = (data) => {
  return {
    type: GET_USER_SUCCESS,
    payload: data
  };
};

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

export const getAdminsPending = () => {
  return {
    type: GET_ADMINS_PENDING
  };
};

export const getAdminsFullFilled = (payload) => {
  return {
    type: GET_ADMINS_FULLFILLED,
    payload
  };
};

export const getAdminsError = () => {
  return {
    type: GET_ADMINS_ERROR,
    payload: console.error
  };
};

export const deleteAdminsPending = () => {
  return {
    type: DELETE_ADMINS_PENDING
  };
};

export const deleteAdminsSuccess = (payload) => {
  return {
    type: DELETE_ADMINS_FULLFILLED,
    payload
  };
};

export const deleteAdminsError = (error) => {
  return {
    type: DELETE_ADMINS_ERROR,
    payload: error
  };
};

export const createAdminsPending = () => {
  return {
    type: POST_ADMINS_PENDING
  };
};

export const createAdminsFullFilled = (payload) => {
  return {
    type: POST_ADMINS_FULLFILLED,
    payload
  };
};

export const createAdminsError = (error) => {
  return {
    type: POST_ADMINS_ERROR,
    payload: error
  };
};

export const editAdminsPending = () => {
  return {
    type: PUT_ADMINS_PENDING
  };
};

export const editAdminsFullFilled = (payload) => {
  return {
    type: PUT_ADMINS_FULLFILLED,
    payload
  };
};

export const editAdminsError = (error) => {
  return {
    type: PUT_ADMINS_ERROR,
    payload: error
  };
};

import {
  GET_ADMINS_PENDING,
  GET_ADMINS_FULLFILLED,
  GET_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_FULLFILLED,
  DELETE_ADMINS_ERROR
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

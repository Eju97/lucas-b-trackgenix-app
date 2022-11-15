import {
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_PENDING,
  POST_SUPERADMINS_ERROR
} from './constants';

export const getSuperAdminsSuccess = (payload) => {
  return {
    type: GET_SUPERADMINS_SUCCESS,
    payload
  };
};

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPERADMINS_PENDING
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPERADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperAdminsSuccess = (payload) => {
  return {
    type: DELETE_SUPERADMINS_SUCCESS,
    payload
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: DELETE_SUPERADMINS_PENDING
  };
};

export const deleteSuperAdminsError = (error) => {
  return {
    type: DELETE_SUPERADMINS_ERROR,
    payload: error
  };
};

export const postSuperAdminsPending = () => {
  return {
    type: POST_SUPERADMINS_PENDING
  };
};

export const postSuperAdminsSuccess = (payload) => {
  return {
    type: POST_SUPERADMINS_SUCCESS,
    payload
  };
};

export const postSuperAdminError = (error) => {
  return {
    type: POST_SUPERADMINS_ERROR,
    payload: error
  };
};

import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECTS_ERROR,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_PENDING,
  POST_PROJECTS_ERROR,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_SUCCESS,
  PUT_PROJECTS_ERROR,
  PUT_PROJECTS_PENDING,
  PUT_PROJECTS_SUCCESS
} from './constants';

export const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};

export const getProjectsSuccess = (payload) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload
  };
};

export const getProjectsError = (error) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
};

export const deleteProjectsPending = () => {
  return {
    type: DELETE_PROJECTS_PENDING
  };
};

export const deleteProjectsSuccess = (payload) => {
  return {
    type: DELETE_PROJECTS_SUCCESS,
    payload
  };
};

export const deleteProjectsError = (error) => {
  return {
    type: DELETE_PROJECTS_ERROR,
    payload: error
  };
};

export const postProjectsPending = () => {
  return {
    type: POST_PROJECTS_PENDING
  };
};

export const postProjectsSuccess = (payload) => {
  return {
    type: POST_PROJECTS_SUCCESS,
    payload
  };
};

export const postProjectsError = (error) => {
  return {
    type: POST_PROJECTS_ERROR,
    payload: error
  };
};

export const putProjectsPending = () => {
  return {
    type: PUT_PROJECTS_PENDING
  };
};

export const putProjectsSuccess = (payload) => {
  return {
    type: PUT_PROJECTS_SUCCESS,
    payload
  };
};

export const putProjectsError = (error) => {
  return {
    type: PUT_PROJECTS_ERROR,
    payload: error
  };
};

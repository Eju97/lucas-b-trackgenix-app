import {
  GET_TASK_SUCCESS,
  GET_TASK_PENDING,
  GET_TASK_ERROR,
  DELETE_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  CREATE_TASK_PENDING,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_PENDING,
  UPDATE_TASK_ERROR
} from './constants';

export const getTaskPending = () => {
  return { type: GET_TASK_PENDING };
};
export const getTaskSuccess = (data) => {
  return { type: GET_TASK_SUCCESS, payload: data };
};
export const getTaskError = (error) => {
  return { type: GET_TASK_ERROR, payload: error };
};
export const deleteTaskSuccess = (payload) => {
  return { type: DELETE_TASK_SUCCESS, payload };
};
export const deleteTaskPendig = () => {
  return { type: DELETE_TASK_PENDING };
};
export const deleteTaskError = (error) => {
  return { type: DELETE_TASK_ERROR, payload: error };
};
export const createTaskSuccess = (payload) => {
  return { type: CREATE_TASK_SUCCESS, payload };
};
export const createTaskPendig = () => {
  return { type: CREATE_TASK_PENDING };
};
export const createTaskError = (error) => {
  return { type: CREATE_TASK_ERROR, payload: error };
};
export const updateTaskSuccess = (payload) => {
  return { type: UPDATE_TASK_SUCCESS, payload };
};
export const updateTaskPendig = () => {
  return { type: UPDATE_TASK_PENDING };
};
export const updateTaskError = (error) => {
  return { type: UPDATE_TASK_ERROR, payload: error };
};

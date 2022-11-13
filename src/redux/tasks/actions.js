import {
  GET_TASK_SUCCESS,
  GET_TASK_PENDING,
  GET_TASK_ERROR,
  DELETE_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS
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
export const deleteTaskSuccess = (data) => {
  return { type: DELETE_TASK_SUCCESS, payload: data };
};
export const deleteTaskPendig = () => {
  return { type: DELETE_TASK_PENDING };
};
export const deleteTaskError = (error) => {
  return { type: DELETE_TASK_ERROR, payload: error };
};

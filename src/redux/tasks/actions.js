import { GET_TASK_SUCCESS, GET_TASK_PENDING, GET_TASK_ERROR } from './constants';

export const getTaskPending = () => {
  return { type: GET_TASK_PENDING };
};
export const getTaskSuccess = (data) => {
  return { type: GET_TASK_SUCCESS, payload: data };
};
export const getTaskError = (error) => {
  return { type: GET_TASK_ERROR, payload: error };
};

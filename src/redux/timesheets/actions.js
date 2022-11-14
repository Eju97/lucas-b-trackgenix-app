import {
  GET_TIMESHEETS_ERROR,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEETS_ERROR,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_SUCCESS,
  POST_TIMESHEETS_ERROR
} from './constants';

export const getTimesheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const deleteTimesheetsPending = () => {
  return {
    type: DELETE_TIMESHEETS_PENDING
  };
};

export const createTimesheetPending = () => {
  return {
    type: POST_TIMESHEETS_PENDING
  };
};

export const getTimesheetsSuccess = (payload) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload
  };
};

export const deleteTimesheetsSuccess = (payload) => {
  return {
    type: DELETE_TIMESHEETS_SUCCESS,
    payload
  };
};

export const createTimesheetSuccess = (payload) => {
  return {
    type: POST_TIMESHEETS_SUCCESS,
    payload
  };
};

export const getTimesheetsError = (error) => {
  return {
    type: GET_TIMESHEETS_ERROR,
    payload: error
  };
};

export const deleteTimesheetsError = (error) => {
  return {
    type: DELETE_TIMESHEETS_ERROR,
    payload: error
  };
};

export const createTimesheetError = (error) => {
  return {
    type: POST_TIMESHEETS_ERROR,
    payload: error
  };
};

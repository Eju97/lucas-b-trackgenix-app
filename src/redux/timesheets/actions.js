import { GET_TIMESHEETS_ERROR, GET_TIMESHEETS_PENDING, GET_TIMESHEETS_SUCCESS } from './constants';

export const getTimesheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimesheetsSuccess = (payload) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload
  };
};

export const getTimesheetsError = (error) => {
  return {
    type: GET_TIMESHEETS_ERROR,
    payload: error
  };
};

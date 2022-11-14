import { getTimesheetsError, getTimesheetsSuccess, getTimesheetsPending } from './actions';

export const getTimesheets = () => {
  return (dispatch) => {
    dispatch(getTimesheetsPending());
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getTimesheetsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getTimesheetsError(error));
      });
  };
};

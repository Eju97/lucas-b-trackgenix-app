import {
  getTimesheetsError,
  getTimesheetsSuccess,
  getTimesheetsPending,
  deleteTimesheetsError,
  deleteTimesheetsSuccess,
  deleteTimesheetsPending
} from './actions';

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

export const deleteTimesheet = (id) => {
  return (dispatch) => {
    dispatch(deleteTimesheetsPending());
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.error) {
          throw new Error('Could not delete the timesheet');
        } else {
          dispatch(deleteTimesheetsSuccess(id));
        }
      })
      .catch((error) => {
        dispatch(deleteTimesheetsError(error));
      });
  };
};

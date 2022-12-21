import {
  getTimesheetsError,
  getTimesheetsSuccess,
  getTimesheetsPending,
  deleteTimesheetsError,
  deleteTimesheetsSuccess,
  deleteTimesheetsPending,
  createTimesheetPending,
  createTimesheetSuccess,
  createTimesheetError,
  editTimesheetPending,
  editTimesheetSuccess,
  editTimesheetError
} from './actions';

export const getTimesheets = () => {
  return (dispatch) => {
    dispatch(getTimesheetsPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error('ERROR: Could not get Timesheets');
        }
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
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => {
        if (response.status === 204) {
          dispatch(deleteTimesheetsSuccess(id));
        } else throw new Error(response.message);
      })
      .catch((error) => {
        dispatch(deleteTimesheetsError(error));
      });
  };
};

export const createTimesheet = (newTimesheet) => {
  return (dispatch) => {
    dispatch(createTimesheetPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token },
      body: JSON.stringify({
        description: newTimesheet.description,
        date: newTimesheet.date,
        hours: newTimesheet.hours,
        project: newTimesheet.project,
        employee: newTimesheet.employee,
        task: newTimesheet.task
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        return dispatch(createTimesheetSuccess(response.data));
      })
      .catch((error) => {
        return dispatch(createTimesheetError(error));
      });
  };
};

export const editTimesheet = (id, timesheet) => {
  return (dispatch) => {
    dispatch(editTimesheetPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', token },
      body: JSON.stringify({
        description: timesheet.description,
        date: timesheet.date,
        hours: timesheet.hours,
        project: timesheet.project,
        employee: timesheet.employee,
        task: timesheet.task
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        return dispatch(editTimesheetSuccess(response.data));
      })
      .catch((error) => {
        return dispatch(editTimesheetError(error.toString()));
      });
  };
};

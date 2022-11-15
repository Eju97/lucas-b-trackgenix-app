import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  deleteEmployeesError,
  deleteEmployeesPending,
  deleteEmployeesSuccess,
  postEmployeesPending,
  postEmployeesSuccess,
  postEmployeesError
} from './actions';

export const getEmployees = () => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getEmployeesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getEmployeesError(error.toString()));
      });
  };
};

export const deleteEmployees = (id) => {
  return (dispatch) => {
    dispatch(deleteEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else dispatch(deleteEmployeesSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteEmployeesError(error.toString()));
      });
  };
};
export const postEmployee = (newEmployee) => {
  return (dispatch) => {
    dispatch(postEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmployee)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(postEmployeesSuccess(response));
        }
      })
      .catch((error) => {
        dispatch(postEmployeesError(error.toString()));
      });
  };
};

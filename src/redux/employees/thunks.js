import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  deleteEmployeesError,
  deleteEmployeesPending,
  deleteEmployeesSuccess,
  postEmployeesPending,
  postEmployeesSuccess,
  postEmployeesError,
  putEmployeesPending,
  putEmployeesSuccess,
  putEmployeesError
} from './actions';

export const getEmployees = () => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/employees`, { headers: { token } })
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
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => {
        if (response.status === 204) {
          dispatch(deleteEmployeesSuccess(id));
        } else throw new Error(response.message);
      })
      .catc.catch((error) => {
        dispatch(deleteEmployeesError(error.toString()));
      });
  };
};

export const postEmployee = (newEmployee) => {
  return (dispatch) => {
    dispatch(postEmployeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees`, {
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
          return dispatch(postEmployeesSuccess(response));
        }
      })
      .catch((error) => {
        return dispatch(postEmployeesError(error.toString()));
      });
  };
};

export const putEmployee = (id, data) => {
  return (dispatch) => {
    dispatch(putEmployeesPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          return dispatch(putEmployeesSuccess(response.data));
        }
      })
      .catch((error) => {
        return dispatch(putEmployeesError(error.toString()));
      });
  };
};

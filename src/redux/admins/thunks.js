import {
  getAdminsPending,
  getAdminsFullFilled,
  getAdminsError,
  deleteAdminsPending,
  deleteAdminsSuccess,
  deleteAdminsError,
  createAdminsPending,
  createAdminsFullFilled,
  createAdminsError,
  editAdminsPending,
  editAdminsFullFilled,
  editAdminsError
} from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/admins`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else dispatch(getAdminsFullFilled(response.data));
      })
      .catch((err) => {
        dispatch(getAdminsError(err.toString()));
      });
  };
};

export const deleteAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteAdminsPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else dispatch(deleteAdminsSuccess(id));
      })
      .catch((err) => {
        dispatch(deleteAdminsError(err.toString()));
      });
  };
};

export const createAdmin = (data) => {
  return (dispatch) => {
    dispatch(createAdminsPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: 'POST',
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
        } else return dispatch(createAdminsFullFilled(response.data));
      })
      .catch((err) => {
        return dispatch(createAdminsError(err.toString()));
      });
  };
};

export const editAdmin = (id, data) => {
  return (dispatch) => {
    dispatch(editAdminsPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
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
        } else return dispatch(editAdminsFullFilled(response.data));
      })
      .catch((err) => {
        return dispatch(editAdminsError(err.toString()));
      });
  };
};

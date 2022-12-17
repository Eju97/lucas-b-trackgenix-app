import {
  getSuperAdminsError,
  getSuperAdminsSuccess,
  getSuperAdminsPending,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError,
  postSuperAdminError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  putSuperAdminsPending,
  putSuperAdminsSuccess,
  putSuperAdminsError
} from './actions';

export const getSuperAdmins = () => {
  return (dispatch) => {
    dispatch(getSuperAdminsPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else dispatch(getSuperAdminsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getSuperAdminsError(error.toString()));
      });
  };
};

export const deleteSuperAdmins = (id) => {
  return (dispatch) => {
    dispatch(deleteSuperAdminsPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => {
        if (response.status === 204) {
          dispatch(deleteSuperAdminsSuccess(id));
        } else throw new Error(response.message);
      })
      .catc.catch((error) => {
        dispatch(deleteSuperAdminsError(error.toString()));
      });
  };
};

export const postSuperAdmins = (data) => {
  return (dispatch) => {
    dispatch(postSuperAdminsPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins/`, {
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
        } else {
          return dispatch(postSuperAdminsSuccess(response.data));
        }
      })
      .catch((error) => {
        return dispatch(postSuperAdminError(error));
      });
  };
};

export const putSuperAdmins = (id, data) => {
  return (dispatch) => {
    dispatch(putSuperAdminsPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
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
          return dispatch(putSuperAdminsSuccess(response.data));
        }
      })
      .catch((error) => {
        return dispatch(putSuperAdminsError(error));
      });
  };
};

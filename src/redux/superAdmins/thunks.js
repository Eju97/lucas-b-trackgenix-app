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
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
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
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else dispatch(deleteSuperAdminsSuccess(id));
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteSuperAdminsError(error.toString()));
      });
  };
};

export const postSuperAdmins = (data) => {
  return (dispatch) => {
    dispatch(postSuperAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    return fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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

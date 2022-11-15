import {
  getSuperAdminsError,
  getSuperAdminsSuccess,
  getSuperAdminsPending,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError,
  postSuperAdminError,
  postSuperAdminsPending,
  postSuperAdminsSuccess
} from './actions';

export const getSuperAdmins = (dispatch) => {
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

export const postSuperAdmins = (inputData) => {
  return (dispatch) => {
    dispatch(postSuperAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(postSuperAdminsSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(postSuperAdminError(error.toString()));
      });
  };
};

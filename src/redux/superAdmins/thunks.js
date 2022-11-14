import {
  getSuperAdminsError,
  getSuperAdminsSuccess,
  getSuperAdminsPending,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError
} from './actions';

export const getSuperAdmins = (dispatch) => {
  dispatch(getSuperAdminsPending());
  fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
    .then((response) => response.json())
    .then((response) => {
      dispatch(getSuperAdminsSuccess(response.data));
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
        dispatch(deleteSuperAdminsSuccess(id));
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteSuperAdminsError(error.toString()));
      });
  };
};

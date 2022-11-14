import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectsPending,
  deleteProjectsError,
  deleteProjectsSuccess
} from './actions';

export const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else dispatch(getProjectsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getProjectsError(err.toString()));
      });
  };
};

export const deleteProject = (id) => {
  return (dispatch) => {
    dispatch(deleteProjectsPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else dispatch(deleteProjectsSuccess(id));
      })
      .catch((err) => {
        dispatch(deleteProjectsError(err.toString()));
      });
  };
};

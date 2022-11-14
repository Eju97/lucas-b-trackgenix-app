import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectsPending,
  deleteProjectsError,
  deleteProjectsSuccess,
  postProjectsError,
  postProjectsPending,
  postProjectsSuccess
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

export const postProject = (project) => {
  return (dispatch) => {
    dispatch(postProjectsPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else dispatch(postProjectsSuccess(project));
      })
      .catch((err) => {
        dispatch(postProjectsError(err.toString()));
      });
  };
};

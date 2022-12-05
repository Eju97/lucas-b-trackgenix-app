import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  deleteProjectsPending,
  deleteProjectsError,
  deleteProjectsSuccess,
  postProjectsError,
  postProjectsPending,
  postProjectsSuccess,
  putProjectsError,
  putProjectsPending,
  putProjectsSuccess
} from './actions';

export const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/projects`, { headers: { token } })
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
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { token }
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
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/projects/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        token
      },
      body: JSON.stringify(project)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        return dispatch(postProjectsSuccess(project));
      })
      .catch((err) => {
        return dispatch(postProjectsError(err.toString()));
      });
  };
};

export const putProject = (id, project) => {
  return (dispatch) => {
    dispatch(putProjectsPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        token
      },
      body: JSON.stringify(project)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        return dispatch(putProjectsSuccess(response.data));
      })
      .catch((err) => {
        return dispatch(putProjectsError(err.toString()));
      });
  };
};

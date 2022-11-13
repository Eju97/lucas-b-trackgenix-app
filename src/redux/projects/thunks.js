import { getProjectsPending, getProjectsSuccess, getProjectsError } from './actions';

export const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectsSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getProjectsError(err.toString()));
      });
  };
};

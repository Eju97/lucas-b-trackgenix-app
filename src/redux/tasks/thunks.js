import { getTaskSuccess, getTaskPending, getTaskError } from './actions';

export const getTask = () => {
  return (dispatch) => {
    dispatch(getTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getTaskSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getTaskError(error.toString()));
      });
  };
};

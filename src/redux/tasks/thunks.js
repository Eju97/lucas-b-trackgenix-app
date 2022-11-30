import {
  getTaskSuccess,
  getTaskPending,
  getTaskError,
  deleteTaskSuccess,
  deleteTaskPendig,
  deleteTaskError,
  createTaskSuccess,
  createTaskPendig,
  createTaskError,
  updateTaskSuccess,
  updateTaskPendig,
  updateTaskError
} from './actions';

export const getTask = () => {
  return (dispatch) => {
    dispatch(getTaskPending());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`, { headers: { token } })
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

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch(deleteTaskPendig());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: { token }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else dispatch(deleteTaskSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteTaskError(error.toString()));
      });
  };
};

export const createTask = (newTask) => {
  return (dispatch) => {
    dispatch(createTaskPendig());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(newTask)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        return dispatch(createTaskSuccess(newTask));
      })
      .catch((error) => {
        return dispatch(createTaskError(error.toString()));
      });
  };
};

export const updateTask = (id, task) => {
  return (dispatch) => {
    dispatch(updateTaskPendig());
    const token = sessionStorage.getItem('token');
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        token
      },
      body: JSON.stringify(task)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        }
        return dispatch(updateTaskSuccess(response.data));
      })
      .catch((error) => {
        return dispatch(updateTaskError(error.toString()));
      });
  };
};

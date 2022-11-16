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

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch(deleteTaskPendig());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
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
    return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
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

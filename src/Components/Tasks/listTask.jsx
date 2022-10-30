import React from 'react';

const ListTask = ({ listTask, deleteTask }) => {
  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    deleteTask(listTask._id);
  };

  return (
    <tr>
      <td>{listTask.description}</td>
      <td>
        <button type="submit">Edit</button>
      </td>
      <td>
        <button onClick={() => handleDelete(listTask._id)}>Delete</button>
      </td>
    </tr>
  );
};
export default ListTask;

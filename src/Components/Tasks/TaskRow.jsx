import React from 'react';

const TaskRow = ({ task, setShowModal, setSelectedId }) => {
  const onDeleteIconClick = (event) => {
    event.stopPropagation();
    setShowModal(true);
    setSelectedId(task._id);
  };
  return (
    <tr
      onClick={() => {
        window.location.assign(`/tasks/form?id=${task._id}`);
      }}
    >
      <td>{task.description}</td>
      <td>
        <button onClick={onDeleteIconClick}>X</button>
      </td>
    </tr>
  );
};

export default TaskRow;

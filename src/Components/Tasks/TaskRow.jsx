import React from 'react';

const TaskRow = ({ task, setShowModal, setSelectedId }) => {
  const onDeleteIconClick = () => {
    setShowModal(true);
    setSelectedId(task._id);
  };

  return (
    <tr>
      <td>{task.description}</td>
      <td>
        <button onClick={onDeleteIconClick}>X</button>
      </td>
    </tr>
  );
};

export default TaskRow;

import React from 'react';
import { useHistory } from 'react-router-dom';

const TaskRow = ({ task, setShowModal, setSelectedId }) => {
  const history = useHistory();
  const onDeleteIconClick = (event) => {
    event.stopPropagation();
    setShowModal(true);
    setSelectedId(task._id);
  };
  return (
    <tr
      onClick={() => {
        history.push(`/tasks/form/${task._id}`);
      }}
    >
      <td>{task.description}</td>
      <td>
        <img src="../assets/images/remove.svg" onClick={onDeleteIconClick}></img>
      </td>
    </tr>
  );
};

export default TaskRow;

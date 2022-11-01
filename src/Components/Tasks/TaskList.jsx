import React from 'react';
import TaskRow from './TaskRow';

const TaskList = ({ list, setShowModal, setSelectedId }) => {
  if (!list || !list.length) {
    return <div>No task yet!</div>;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
          {list.map((task) => {
            return (
              <TaskRow
                key={task._id}
                task={task}
                setSelectedId={setSelectedId}
                setShowModal={setShowModal}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

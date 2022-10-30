import React from 'react';
import ListTask from './listTask';

const List = ({ list, deleteTask }) => {
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
            return <ListTask key={task._id} listTask={task} deleteTask={deleteTask} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
export default List;

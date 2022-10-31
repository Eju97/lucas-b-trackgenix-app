import React from 'react';
import ListTask from './listTask';

const List = ({ list, handleDelete }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
          {list === undefined || list.length === 0 ? (
            <td>No task yet!</td>
          ) : (
            list.map((task) => {
              return <ListTask key={task._id} listTask={task} handleDelete={handleDelete} />;
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
export default List;

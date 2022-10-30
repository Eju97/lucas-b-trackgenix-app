import React from 'react';
import Employee from './employee';

const ListEmployees = ({ listEmployes, deleteItem }) => {
  return (
    <div className="table-container">
      <table>
        <thread>
          <tr>
            <th id="id">ID</th>
            <th id="Name">Name</th>
            <th id="UserName">UserName</th>
            <th id="Email">Email</th>
            <th id="Phone">Phone</th>
          </tr>
        </thread>
        <tbody>
          {listEmployes.map((item) => (
            <Employee key={item._id} employee={item} deleteItem={deleteItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployees;

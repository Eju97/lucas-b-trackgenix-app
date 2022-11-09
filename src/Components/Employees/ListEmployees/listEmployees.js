import React from 'react';
import EmployeeRow from '../EmployeeRow/employeeRow';

const ListEmployees = ({ listEmployes, deleteItem, setShowModal, setSelectedEmployee }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th id="Name">Name</th>
            <th id="LastName">Last name</th>
            <th id="Email">Email</th>
            <th id="Email">Phone</th>
          </tr>
        </thead>
        <tbody>
          {listEmployes.map((item) => (
            <EmployeeRow
              key={item._id}
              employee={item}
              deleteItem={deleteItem}
              setShowModal={setShowModal}
              setSelectedEmployee={setSelectedEmployee}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployees;

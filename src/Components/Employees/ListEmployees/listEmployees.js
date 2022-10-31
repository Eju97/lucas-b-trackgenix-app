import React from 'react';
import EmployeeRow from '../employeeRow';

const ListEmployees = ({ listEmployes, deleteItem, setShowModal, setSelecterEmployee }) => {
  return (
    <div className="table-container">
      <table>
        <thread>
          <tr>
            <th id="id">ID</th>
            <th id="Name">Name</th>
            <th id="Email">Email</th>
          </tr>
        </thread>
        <tbody>
          {listEmployes.map((item) => (
            <EmployeeRow
              key={item._id}
              employee={item}
              deleteItem={deleteItem}
              setShowModal={setShowModal}
              setSelecterEmployee={setSelecterEmployee}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployees;

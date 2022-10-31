import React from 'react';
import Employee from './employee';

const ListEmployees = ({ listEmployes, deleteItem, setShowModal, setSelecterEmployee }) => {
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
            <Employee
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

import React from 'react';

const Employee = ({ employee, setShowModal, setSelecterEmployee }) => {
  return (
    <tr className="rows">
      <td> {employee._id} </td>
      <td> {employee.name} </td>
      <td> {employee.userName} </td>
      <td> {employee.email} </td>
      <td> {employee.phone} </td>
      <td>
        <button
          onClick={() => {
            setSelecterEmployee(employee._id);
            setShowModal(true);
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default Employee;

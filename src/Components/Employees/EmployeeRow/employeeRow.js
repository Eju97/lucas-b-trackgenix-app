import React from 'react';

const EmployeeRow = ({ employee, setShowModal, setSelectedEmployee }) => {
  return (
    <tr className="rows">
      <td> {employee._id} </td>
      <td> {employee.name} </td>
      <td> {employee.email} </td>
      <td>
        <button
          onClick={() => {
            setSelectedEmployee(employee._id);
            setShowModal(true);
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;

import React from 'react';

const EmployeeRow = ({ employee, setShowModal, setSelectedEmployee }) => {
  return (
    <tr
      className="rows"
      onClick={() => (window.location.href = `employees/form?id=${employee._id}`)}
    >
      <td>{employee.name}</td>
      <td>{employee.lastName}</td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>
        <button
          onClick={(event) => {
            event.stopPropagation();
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

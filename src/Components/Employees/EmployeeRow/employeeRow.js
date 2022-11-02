import React from 'react';

const EmployeeRow = ({ employee, setShowModal, setSelectedEmployee }) => {
  return (
    <tr className="rows">
      <td onClick={() => (window.location.href = `employees/form?id=${employee._id}`)}>
        {employee.name}
      </td>
      <td onClick={() => (window.location.href = `employees/form?id=${employee._id}`)}>
        {employee.lastName}
      </td>
      <td onClick={() => (window.location.href = `employees/form?id=${employee._id}`)}>
        {employee.email}
      </td>
      <td onClick={() => (window.location.href = `employees/form?id=${employee._id}`)}>
        {employee.phone}
      </td>
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

import React from 'react';

const EmployeeRow = ({ employee, setShowModal, setSelectedEmployee }) => {
  return (
    <tr className="rows">
      <td onClick={() => (window.location.href = `employees/form?id=${employee._id}`)}>
        {employee._id}
      </td>
      <td onClick={() => (window.location.href = `employees/form?id=${employee._id}`)}>
        {employee.name}
      </td>
      <td onClick={() => (window.location.href = `employees/form?id=${employee._id}`)}>
        {employee.email}
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
        <a href={`employees/form?id=${employee._id}`}>Edit</a>
      </td>
    </tr>
  );
};

export default EmployeeRow;

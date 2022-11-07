import React from 'react';
import { useHistory } from 'react-router-dom';

const EmployeeRow = ({ employee, setShowModal, setSelectedEmployee }) => {
  const history = useHistory();
  return (
    <tr className="rows" onClick={() => history.push(`employees/form/${employee._id}`)}>
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

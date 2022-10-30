import React from 'react';

const Employee = ({ employee, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(employee._id);
  };
  return (
    <tr className="rows">
      <td> {employee._id} </td>
      <td> {employee.name} </td>
      <td> {employee.userName} </td>
      <td> {employee.email} </td>
      <td> {employee.phone} </td>
      <td>
        <button onClick={() => handleDelete(employee._id)}>X</button>
      </td>
    </tr>
  );
};

export default Employee;

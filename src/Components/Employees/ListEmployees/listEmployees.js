import React from 'react';
import Table from '../../Shared/Table';

const ListEmployees = ({ listEmployes, deleteItem, setShowModal, setSelectedEmployee }) => {
  return (
    <Table
      listEmployes={listEmployes}
      deleteItem={deleteItem}
      showModal={setShowModal}
      setSelectedEmployee={setSelectedEmployee}
    />
  );
};

export default ListEmployees;

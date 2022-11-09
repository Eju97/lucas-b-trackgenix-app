import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';

const Employees = () => {
  const history = useHistory();
  const [listEmployes, setListEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        setListEmployees(response.data);
      });
  }, []);

  const deleteItem = async (_id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${_id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setListEmployees([...listEmployes.filter((employee) => employee._id !== _id)]);
    }
  };

  const onDelete = (_id, showModal) => {
    setSelectedEmployee(_id);
    setShowModal(showModal);
  };

  const onRowClick = (_id) => {
    history.push(`/employees/form/${_id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onConfirm = () => {
    deleteItem(selectedEmployee);
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal isOpen={showModal} handleClose={closeModal}>
        <div>
          <h3>Do you really want to delete this Timesheet?</h3>
        </div>
        <div>
          <Button onClick={closeModal} variant="cancel" name="Cancel" />
          <Button onClick={onConfirm} variant="confirm" name="Accept" />
        </div>
      </Modal>
      <h2>Employees</h2>
      <div>
        <Table
          data={listEmployes}
          headers={['name', 'lastName', 'email', 'password', 'phone']}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
      </div>
    </section>
  );
};

export default Employees;

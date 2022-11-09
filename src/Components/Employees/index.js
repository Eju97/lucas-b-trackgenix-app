import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';

const Employees = () => {
  const urlForm = '/employees/form/';
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
          showModal={setShowModal}
          setSelectedEmployee={setSelectedEmployee}
          deleteId={deleteItem}
          urlForm={urlForm}
        />
      </div>
    </section>
  );
};

export default Employees;

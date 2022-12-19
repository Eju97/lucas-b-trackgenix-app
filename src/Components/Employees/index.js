import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployees } from '../../redux/employees/thunks';

const Employees = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const dispatch = useDispatch();
  const { list: employeesList, isLoading, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const onDelete = (_id) => {
    setSelectedEmployee(_id);
    setShowModal(true);
  };

  const onRowClick = (_id) => {
    history.push(`employees/form/${_id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onConfirm = () => {
    dispatch(deleteEmployees(selectedEmployee));
    setShowModal(false);
  };

  if (isLoading) {
    return <h2 className={styles.position}>Loading list employees...</h2>;
  }
  if (error) {
    return <h2>Employees not found</h2>;
  }
  return (
    <section className={styles.container}>
      <Modal isOpen={showModal} handleClose={closeModal}>
        <div>
          <h3>Do you really want to delete this Employee?</h3>
        </div>
        <div>
          <Button onClick={closeModal} variant="cancel" name="Cancel" />
          <Button onClick={onConfirm} variant="confirm" name="Accept" />
        </div>
      </Modal>
      <h2>Employees</h2>
      <div>
        <Table
          data={employeesList}
          headers={['name', 'lastName', 'email', 'phone']}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
        <div className={styles.containerButton}>
          <Button
            type="submit"
            variant="confirm"
            name="Create + "
            onClick={() => history.push(`employees/form`)}
          />
        </div>
      </div>
    </section>
  );
};

export default Employees;

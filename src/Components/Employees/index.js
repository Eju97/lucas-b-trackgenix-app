import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import ListEmployees from './ListEmployees/listEmployees';
import DeleteConfirmationModal from './Modal/modal';
import { Link } from 'react-router-dom';

const Employees = () => {
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
      <DeleteConfirmationModal show={showModal} closeModal={closeModal} onConfirm={onConfirm} />
      <h2>Employees</h2>
      <Link to="/employees/form">
        <button>Add Employee</button>
      </Link>
      <div>
        <ListEmployees
          listEmployes={listEmployes}
          setListEmployees={setListEmployees}
          deleteItem={deleteItem}
          setShowModal={setShowModal}
          setSelectedEmployee={setSelectedEmployee}
        />
      </div>
    </section>
  );
};

export default Employees;

import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import ListEmployees from './ListEmployees/listEmployees';
import DeleteConfirmationModal from './Modal/modal';

const Employees = () => {
  const [listEmployes, saveEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selecterEmployee, setSelecterEmployee] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  const deleteItem = async (_id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${_id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      saveEmployees([...listEmployes.filter((employee) => employee._id !== _id)]);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onConfirm = () => {
    deleteItem(selecterEmployee);
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <DeleteConfirmationModal show={showModal} closeModal={closeModal} onConfirm={onConfirm} />
      <h2>Employees</h2>
      <div>
        <ListEmployees
          listEmployes={listEmployes}
          saveEmployees={saveEmployees}
          deleteItem={deleteItem}
          setShowModal={setShowModal}
          setSelecterEmployee={setSelecterEmployee}
        />
      </div>
    </section>
  );
};

export default Employees;

import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import ListEmployees from './listEmployees';
import Modal from './modal';

function Employees() {
  const [listEmployes, saveEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selecterEmployee, setSelecterEmployee] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  const deleteItem = (_id) => {
    saveEmployees([...listEmployes.filter((employee) => employee._id !== _id)]);
    // aca iria la request para eliminar?
    fetch(`${process.env.REACT_APP_API_URL}/employees/${_id}`, {
      method: 'DELETE'
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const onComfirm = () => {
    deleteItem(selecterEmployee);
  };

  return (
    <section className={styles.container}>
      <Modal show={showModal} closeModal={closeModal} onComfirm={onComfirm} />
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
}

export default Employees;

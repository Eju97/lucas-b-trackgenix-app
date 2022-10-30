import React, { useEffect, useState } from 'react';
import styles from './employees.module.css';
import ListEmployees from './listEmployees';

function Employees() {
  const [listEmployes, saveEmployees] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  const deleteItem = (_id) => {
    saveEmployees([...listEmployes.filter((employee) => employee._id !== _id)]);
  };
  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div>
        <ListEmployees
          listEmployes={listEmployes}
          saveEmployees={saveEmployees}
          deleteItem={deleteItem}
        />
      </div>
    </section>
  );
}

export default Employees;

import React, { useState } from 'react';
import styles from './super-admins-form.module.css';

function SuperAdminsForm(props) {
  const [inputData, setInputData] = useState({
    name: null,
    last_name: null,
    email: null,
    password: null
  });
  const addSuperAdmin = () => {
    fetch(`http://localhost:3000/super-admins/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
      })
      .then(() => {
        fetch(`http://localhost:3000/super-admins/`)
          .then((response) => response.json())
          .then(() => {
            props.setPrueba(!props.prueba);
          });
      });
  };

  console.log(props);
  /* const onClick = () => {
    window.location.assign('/super-admins')
  } */
  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                onChange={(e) => {
                  setInputData({ ...inputData, name: e.target.value });
                }}
                type="text"
              />
            </td>
            <td>
              <input
                onChange={(e) => {
                  setInputData({ ...inputData, last_name: e.target.value });
                }}
                type="text"
              />
            </td>
            <td>
              <input
                onChange={(e) => {
                  setInputData({ ...inputData, email: e.target.value });
                }}
                type="text"
              />
            </td>
            <td>
              <input
                onChange={(e) => {
                  setInputData({ ...inputData, password: e.target.value });
                }}
                type="text"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={addSuperAdmin} type="submit">
          Create
        </button>
      </div>
    </section>
  );
}

export default SuperAdminsForm;

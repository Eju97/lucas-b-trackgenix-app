import React, { useState, useEffect } from 'react';
import styles from './super-admins-form.module.css';

function SuperAdminsForm() {
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf('=') + 1);
  const [inputData, setInputData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setInputData({
            name: data.data.name,
            last_name: data.data.last_name,
            email: data.data.email,
            password: data.data.password
          });
        });
    }
  }, []);

  const FormMode = () => {
    if (id) {
      onEditSuperAdmin();
    } else {
      onCreateSuperAdmin();
    }
  };

  const onCreateSuperAdmin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
        window.location.assign('/super-admins');
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onEditSuperAdmin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
        window.location.assign('/super-admins');
      })
      .catch((error) => {
        alert(error);
      });
  };

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
                value={inputData.name}
              />
            </td>
            <td>
              <input
                onChange={(e) => {
                  setInputData({ ...inputData, last_name: e.target.value });
                }}
                type="text"
                value={inputData.last_name}
              />
            </td>
            <td>
              <input
                onChange={(e) => {
                  setInputData({ ...inputData, email: e.target.value });
                }}
                type="text"
                value={inputData.email}
              />
            </td>
            <td>
              <input
                onChange={(e) => {
                  setInputData({ ...inputData, password: e.target.value });
                }}
                type="password"
                value={inputData.password}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={FormMode} type="submit">
          Create
        </button>
      </div>
    </section>
  );
}

export default SuperAdminsForm;

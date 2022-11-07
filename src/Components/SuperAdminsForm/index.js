import React, { useState, useEffect } from 'react';
import styles from './super-admins-form.module.css';
import TextAndDateInput from '../Shared/TextAndDateInput/TextAndDateInput';

function SuperAdminsForm() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const formMode = id ? 'edit' : 'create';
  const [inputData, setInputData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    console.log(id);
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

  const onSubmit = () => {
    if (formMode === 'edit') {
      return onEditSuperAdmin();
    }
    return onCreateSuperAdmin();
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
      <form>
        <div className={styles.inputs}>
          <TextAndDateInput
            label="Name"
            onChange={(e) => {
              setInputData({ ...inputData, name: e.target.value });
            }}
            type="text"
            value={inputData.name}
          />
        </div>
        <div className={styles.inputs}>
          <TextAndDateInput
            label="Last Name"
            onChange={(e) => {
              setInputData({ ...inputData, last_name: e.target.value });
            }}
            type="text"
            value={inputData.last_name}
          />
        </div>
        <div className={styles.inputs}>
          <TextAndDateInput
            label="Email"
            onChange={(e) => {
              setInputData({ ...inputData, email: e.target.value });
            }}
            type="email"
            value={inputData.email}
          />
        </div>
        <div className={styles.inputs}>
          <TextAndDateInput
            label="Password"
            onChange={(e) => {
              setInputData({ ...inputData, password: e.target.value });
            }}
            type="text"
            value={inputData.password}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={onSubmit} type="button">
            Apply
          </button>
        </div>
      </form>
    </section>
  );
}

export default SuperAdminsForm;

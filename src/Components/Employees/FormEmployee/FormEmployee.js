import React, { useEffect, useState } from 'react';
import styles from './FormEmployee.module.css';
import Button from '../../Shared/Button';

function Form() {
  const [employeeId, setEmployeeId] = useState();
  const [employeeName, setEmployeeName] = useState('');
  const [employeeLastName, setEmployeeLastName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePhone, setEmployeePhone] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  const [errorState, setErrorState] = useState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || null;
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setEmployeeId(id);
          setEmployeeName(response.data?.name);
          setEmployeeLastName(response.data?.lastName);
          setEmployeeEmail(response.data?.email);
          setEmployeePhone(response.data?.phone);
          setEmployeePassword(response.data?.password);
        });
    }
  }, []);

  const onChangeEmployeeName = (event) => {
    setEmployeeName(event.target.value);
  };
  const onChangeEmployeeLastName = (event) => {
    setEmployeeLastName(event.target.value);
  };
  const onChangeEmployeeEmail = (event) => {
    setEmployeeEmail(event.target.value);
  };
  const onChangeEmployeePhone = (event) => {
    setEmployeePhone(event.target.value);
  };
  const onChangeEmployeePassword = (event) => {
    setEmployeePassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (employeeId) {
      let newEmployee = {
        name: employeeName,
        lastName: employeeLastName,
        phone: employeePhone,
        email: employeeEmail,
        password: employeePassword
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      });
      const data = await response.json();
      if (!data.error) {
        alert('Edited succefully');
        window.location.href = '/employees';
      } else {
        setErrorState(data.message);
      }
    } else {
      let newEmployee = {
        name: employeeName,
        lastName: employeeLastName,
        phone: employeePhone,
        email: employeeEmail,
        password: employeePassword
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      });
      const data = await response.json();
      if (!data.error) {
        alert('Employee created succefully');
        window.location.href = '/employees';
      } else {
        setErrorState(data.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      {errorState && <h3>{errorState}</h3>}
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <label>Name</label>
        <input
          className={styles.input}
          id="employeeName"
          name="employeeName"
          required
          value={employeeName}
          onChange={onChangeEmployeeName}
        />
        <label>LastName</label>
        <input
          className={styles.input}
          id="employeeLastName"
          name="employeeLastName"
          required
          value={employeeLastName}
          onChange={onChangeEmployeeLastName}
        />
        <label>Email</label>
        <input
          className={styles.input}
          id="employeeEmail"
          name="employeeEmail"
          required
          value={employeeEmail}
          onChange={onChangeEmployeeEmail}
        />
        <label>Phone</label>
        <input
          className={styles.input}
          id="employeePhone"
          name="employeePhone"
          required
          value={employeePhone}
          onChange={onChangeEmployeePhone}
        />
        <label>Password</label>
        <input
          className={styles.input}
          id="employeePassword"
          name="employeePassword"
          required
          value={employeePassword}
          onChange={onChangeEmployeePassword}
        />
        <div>
          <Button action={onSubmit} variant="confirm" name="Submit" />
        </div>
      </form>
    </div>
  );
}
export default Form;

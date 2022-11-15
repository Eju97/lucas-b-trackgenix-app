import React, { useEffect, useState } from 'react';
import styles from './FormEmployee.module.css';
import Input from '../../Shared/Input/Input';
import Button from '../../Shared/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postEmployee } from '../../../redux/employees/thunks';

function Form() {
  const history = useHistory();
  const params = useParams();
  const [employeeId, setEmployeeId] = useState();
  const [employeeName, setEmployeeName] = useState('');
  const [employeeLastName, setEmployeeLastName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePhone, setEmployeePhone] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  const [errorState, setErrorState] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const id = params.id;
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
        history.push('/employees');
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
      try {
        dispatch(postEmployee(newEmployee));
        alert('Employee created succefully');
        history.push('/employees');
      } catch (error) {
        setErrorState(error);
      }
      /*.then(() => {
              alert('Employee created succefully');
              history.push('/employees');
            })
            .catch((error) => {
              setErrorState(error);
            })*/
      /*const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      });
      const data = await response.json();
      if (!data.error) {
        alert('Employee created succefully');
        history.push('/employees');
      } else {
        setErrorState(data.message);
      }*/
    }
  };

  return (
    <div className={styles.container}>
      {errorState && <h3>{errorState}</h3>}
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <Input
          label="Name"
          id="employeeName"
          name="employeeName"
          required
          value={employeeName}
          onChange={onChangeEmployeeName}
        />
        <Input
          label="LastName"
          id="employeeLastName"
          name="employeeLastName"
          required
          value={employeeLastName}
          onChange={onChangeEmployeeLastName}
        />
        <Input
          label="Email"
          id="employeeEmail"
          name="employeeEmail"
          required
          value={employeeEmail}
          onChange={onChangeEmployeeEmail}
        />
        <Input
          label="Phone"
          id="employeePhone"
          name="employeePhone"
          required
          value={employeePhone}
          onChange={onChangeEmployeePhone}
        />
        <Input
          label="Password"
          id="employeePassword"
          name="employeePassword"
          required
          value={employeePassword}
          onChange={onChangeEmployeePassword}
        />
        <div>
          <Button onClick={onSubmit} variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
        </div>
      </form>
    </div>
  );
}
export default Form;

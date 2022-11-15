import React, { useEffect, useState } from 'react';
import styles from './FormEmployee.module.css';
import Input from '../../Shared/Input/Input';
import Button from '../../Shared/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postEmployee, putEmployee } from '../../../redux/employees/thunks';
import { POST_EMPLOYEES_SUCCESS } from '../../../redux/employees/constants';

function Form() {
  const history = useHistory();
  const params = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [employeeId, setEmployeeId] = useState();
  /*const [employeeName, setEmployeeName] = useState('');
  const [employeeLastName, setEmployeeLastName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePhone, setEmployeePhone] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');*/
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.employees);

  useEffect(() => {
    const id = params.id;
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setEmployeeId(id);
          setEmployee(response.data?.name);
          setEmployee(response.data?.lastName);
          setEmployee(response.data?.email);
          setEmployee(response.data?.phone);
          setEmployee(response.data?.password);
        });
    }
  }, []);
  const onChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };

  /*const onChangeEmployeeName = (event) => {
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
  };*/

  const onSubmit = async (event) => {
    event.preventDefault();
    if (employeeId) {
      console.log(employeeId);
      try {
        const id = params.id;
        dispatch(putEmployee(id, employee));
        alert('Edited succefully');
        history.push('/employees');
      } catch (error) {
        alert(error);
      }
      /*const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`, {
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
      }*/
    } else {
      try {
        const response = await dispatch(postEmployee(employee));
        if (response.type === POST_EMPLOYEES_SUCCESS) {
          history.push('/employees');
        }
        //alert('Employee created succefully');
        console.log(employee);
      } catch (error) {
        alert(error);
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
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.container}>
      {error && <h3>{error}</h3>}
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <Input
          label="Name"
          id="employeeName"
          name="name"
          required
          value={employee.name}
          onChange={onChange}
        />
        <Input
          label="LastName"
          id="lastName"
          name="lastName"
          required
          value={employee.lastName}
          onChange={onChange}
        />
        <Input
          label="Email"
          id="email"
          name="email"
          required
          value={employee.email}
          onChange={onChange}
        />
        <Input
          label="Phone"
          id="phone"
          name="phone"
          required
          value={employee.phone}
          onChange={onChange}
        />
        <Input
          label="Password"
          id="password"
          name="password"
          required
          value={employee.password}
          onChange={onChange}
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

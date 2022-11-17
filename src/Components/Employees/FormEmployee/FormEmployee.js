import React, { useEffect, useState } from 'react';
import styles from './FormEmployee.module.css';
import Input from '../../Shared/Input/Input';
import Button from '../../Shared/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, postEmployee, putEmployee } from '../../../redux/employees/thunks';
import { POST_EMPLOYEES_SUCCESS, PUT_EMPLOYEES_SUCCESS } from '../../../redux/employees/constants';

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

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.employees);
  const currentEmployee = useSelector((state) =>
    state.employees.list.find((employee) => employee._id === params.id)
  );

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(async () => {
    const id = params.id;
    if (id && currentEmployee) {
      setEmployee({
        name: currentEmployee.name,
        lastName: currentEmployee.lastName,
        email: currentEmployee.email,
        phone: currentEmployee.phone,
        password: currentEmployee.password
      });
    }
  }, [currentEmployee]);
  const onChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const id = params.id;
    if (id) {
      const response = await dispatch(putEmployee(id, employee));
      if (response.type === PUT_EMPLOYEES_SUCCESS) {
        history.push('/employees');
        alert('Edited succefully');
      }
    } else {
      const response = await dispatch(postEmployee(employee));
      if (response.type === POST_EMPLOYEES_SUCCESS) {
        history.push('/employees');
        alert('Employee created succefully');
      }
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
          type={'password'}
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

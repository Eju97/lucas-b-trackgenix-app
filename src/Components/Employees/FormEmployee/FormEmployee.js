import React, { useEffect } from 'react';
import styles from './FormEmployee.module.css';
import Input from '../../Shared/Input/Input';
import Button from '../../Shared/Button';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, postEmployee, putEmployee } from '../../../redux/employees/thunks';
import { POST_EMPLOYEES_SUCCESS, PUT_EMPLOYEES_SUCCESS } from '../../../redux/employees/constants';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeSchema } from '../validations/validations';

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeSchema)
  });
  const history = useHistory();
  const params = useParams();
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
      reset({
        name: currentEmployee.name,
        lastName: currentEmployee.lastName,
        email: currentEmployee.email,
        phone: currentEmployee.phone,
        password: currentEmployee.password
      });
    }
  }, [currentEmployee]);

  const onSubmit = async (data) => {
    const id = params.id;
    if (id) {
      const response = await dispatch(putEmployee(id, data));
      if (response.type === PUT_EMPLOYEES_SUCCESS) {
        history.push('/employees');
        alert('Edited succefully');
      }
    } else {
      const response = await dispatch(postEmployee(data));
      if (response.type === POST_EMPLOYEES_SUCCESS) {
        history.push('/employees');
        alert('Employee created succefully');
      }
    }
  };
  if (isLoading) {
    return <h2 className={styles.position}>Loading form employee...</h2>;
  }
  return (
    <div className={styles.container}>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Form</h2>
        <Input
          register={register}
          label="Name"
          id="employeeName"
          name="name"
          required
          error={errors.name?.message}
        />
        <Input
          register={register}
          label="LastName"
          id="lastName"
          name="lastName"
          required
          error={errors.lastName?.message}
        />
        <Input
          register={register}
          label="Email"
          id="email"
          name="email"
          required
          error={errors.email?.message}
        />
        <Input
          register={register}
          label="Phone"
          id="phone"
          name="phone"
          required
          error={errors.phone?.message}
        />
        <Input
          register={register}
          label="Password"
          id="password"
          name="password"
          required
          type={'password'}
          error={errors.password?.message}
        />
        <div>
          <Button type="submit" variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
          <Button onClick={() => reset()} type="button" variant="reset" name="Reset" />
        </div>
      </form>
    </div>
  );
};
export default Form;

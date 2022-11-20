import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getEmployees, postEmployee } from '../../../redux/employees/thunks';
import { POST_EMPLOYEES_SUCCESS } from '../../../redux/employees/constants';
// import { useParams } from 'react-router-dom';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidation } from './validations';
import styles from './signupemployee.module.css';

const EmployeeSignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidation)
  });

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.employees);

  useEffect(async () => {
    dispatch(getEmployees());
  }, []);

  const onSubmit = async (Data) => {
    const response = await dispatch(postEmployee(Data));
    if (response.type === POST_EMPLOYEES_SUCCESS) {
      history.push('/employee/profile');
      alert('Profile created succefully');
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className={styles.container}>
      <h2>Sign Up Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          label="Name"
          name="name"
          type="text"
          error={errors.name?.message}
        ></Input>
        <Input
          register={register}
          label="Last Name"
          name="lastName"
          type="text"
          error={errors.lastName?.message}
        ></Input>
        <Input
          register={register}
          label="Phone"
          name="phone"
          type="text"
          error={errors.phone?.message}
        ></Input>
        <Input
          register={register}
          label="Email"
          name="email"
          type="text"
          error={errors.email?.message}
        ></Input>
        <Input
          register={register}
          label="Password"
          name="password"
          type="password"
          error={errors.password?.message}
        ></Input>
        <Button
          type="submit"
          variant="confirm"
          name="Submit"
          onClick={handleSubmit(onSubmit)}
        ></Button>
      </form>
    </div>
  );
};

export default EmployeeSignUp;

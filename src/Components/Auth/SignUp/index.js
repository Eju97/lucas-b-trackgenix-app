import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { postEmployee } from 'redux/employees/thunks';
import { POST_EMPLOYEES_SUCCESS } from 'redux/employees/constants';
import { Input, Button, Modal, Spinner } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidation } from 'Components/Employee/EmployeeSignUp/validations';
import styles from './signup.module.css';

const EmployeeSignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoading } = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidation)
  });

  const goBack = () => {
    history.push('/auth/login');
  };

  const closeModal = () => {
    setShowModal(false);
    goBack();
  };

  const onSubmit = async (Data) => {
    const response = await dispatch(postEmployee(Data));
    if (response.type === POST_EMPLOYEES_SUCCESS) {
      setShowModal(true);
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={styles.container}>
      <Modal isOpen={showModal}>
        <div>
          <h3>Account Created Succesfuly</h3>
        </div>
        <div>
          <Button variant="confirm" name="Accept" onClick={closeModal} />
        </div>
      </Modal>
      <h2>Sign Up</h2>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            label="Name"
            name="name"
            required
            type="text"
            error={errors.name?.message}
          ></Input>
          <Input
            register={register}
            label="Last Name"
            name="lastName"
            required
            type="text"
            error={errors.lastName?.message}
          ></Input>
          <Input
            register={register}
            label="Phone"
            name="phone"
            required
            type="text"
            error={errors.phone?.message}
          ></Input>
          <Input
            register={register}
            label="Email"
            name="email"
            required
            type="text"
            error={errors.email?.message}
          ></Input>
          <Input
            register={register}
            label="Password"
            name="password"
            required
            type="password"
            error={errors.password?.message}
          ></Input>
          <div className={styles.buttonContainer}>
            <Button type="submit" variant="confirm" name="Submit"></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeSignUp;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { postEmployee } from 'redux/employees/thunks';
import { POST_EMPLOYEES_SUCCESS } from 'redux/employees/constants';
import { Input, Button, Modal } from 'Components/Shared';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidation } from 'Components/Employee/EmployeeSignUp/validations';
import styles from './signup.module.css';

const EmployeeSignUp = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidation)
  });

  const closeModal = () => {
    setShowModal(false);
    reset();
  };

  const onSubmit = async (Data) => {
    const response = await dispatch(postEmployee(Data));
    if (response.type === POST_EMPLOYEES_SUCCESS) {
      setShowModal(true);
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.container}>
      <Modal isOpen={showModal}>
        <div>
          <h3>Employee Created Succesfuly</h3>
        </div>
        <div>
          <Button variant="confirm" name="Accept" onClick={closeModal} />
        </div>
      </Modal>
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
        <div className={styles.buttonContainer}>
          <Button type="submit" variant="confirm" name="Submit"></Button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeSignUp;

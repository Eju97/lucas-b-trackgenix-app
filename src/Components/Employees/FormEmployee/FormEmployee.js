import React, { useEffect, useState } from 'react';
import styles from './FormEmployee.module.css';
import { Input, Button, Spinner, Modal } from 'Components/Shared/index';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, postEmployee, putEmployee } from '../../../redux/employees/thunks';
import { POST_EMPLOYEES_SUCCESS, PUT_EMPLOYEES_SUCCESS } from '../../../redux/employees/constants';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationEdit } from 'Components/Employee/EditProfile/editProfileValidations';

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidationEdit)
  });
  const [showModal, setShowModal] = useState(false);
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
        phone: currentEmployee.phone
      });
    }
  }, [currentEmployee]);

  const onSubmit = async (data) => {
    const id = params.id;
    if (id) {
      const response = await dispatch(putEmployee(id, data));
      if (response.type === PUT_EMPLOYEES_SUCCESS) {
        setShowModal(true);
      }
    } else {
      const response = await dispatch(postEmployee(data));
      if (response.type === POST_EMPLOYEES_SUCCESS) {
        history.goBack();
        alert('Employee created succefully');
      }
    }
  };

  const acceptButton = () => {
    history.goBack();
    setShowModal(false);
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className={styles.container}>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <div>
          <h3>Employee edited succesfully</h3>
        </div>
        <div>
          <Button onClick={acceptButton} variant="confirm" name="Accept" />
        </div>
      </Modal>
      {error && <h3>{error}</h3>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsBox}>
          <h2>{params.id ? 'Edit Employee' : 'Create New Employee'}</h2>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Name"
              id="employeeName"
              name="name"
              required
              error={errors.name?.message}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="LastName"
              id="lastName"
              name="lastName"
              required
              error={errors.lastName?.message}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Phone"
              id="phone"
              name="phone"
              required
              error={errors.phone?.message}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button type="submit" variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
          <Button onClick={() => reset()} type="button" variant="reset" name="Reset" />
        </div>
      </form>
    </div>
  );
};
export default Form;

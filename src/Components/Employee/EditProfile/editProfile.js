import styles from './editProfile.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, putEmployee } from 'redux/employees/thunks';
import { PUT_EMPLOYEES_SUCCESS } from 'redux/employees/constants';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationEdit } from './editProfileValidations';
import { Button, Modal, Input, Spinner } from 'Components/Shared/index';

const EditEmployeeProfile = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidationEdit)
  });
  const { list: employees, isLoading: isLoadingEmployee } = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const id = params.id;
  const { isLoading } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth.user);
  const currentEmployee = employees.find((employee) => employee._id === id);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(async () => {
    if (userData && currentEmployee) {
      reset({
        name: currentEmployee.name,
        lastName: currentEmployee.lastName,
        phone: currentEmployee.phone
      });
    }
  }, [userData, currentEmployee]);

  const onSubmit = async (employeeData) => {
    const response = await dispatch(putEmployee(id, employeeData));
    if (response.type === PUT_EMPLOYEES_SUCCESS) {
      setShowModal(true);
    }
  };

  const acceptButton = () => {
    history.push('/employee/profile');
    setShowModal(false);
  };

  if (isLoading || isLoadingEmployee) {
    return <Spinner></Spinner>;
  }
  return (
    <div className={styles.container}>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <div>
          <h3>Profile edited succesfully</h3>
        </div>
        <div>
          <Button onClick={acceptButton} variant="confirm" name="Accept" />
        </div>
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsBox}>
          <h2 className={styles.editProfile}>Edit Profile</h2>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Name"
              name="name"
              type="text"
              error={errors.name?.message}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Last Name"
              name="lastName"
              type="text"
              error={errors.lastName?.message}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Phone"
              name="phone"
              type="text"
              error={errors.phone?.message}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button variant="cancel" name="Cancel" onClick={() => history.goBack()} />
            <Button type="submit" name="Submit" variant="confirm" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeProfile;

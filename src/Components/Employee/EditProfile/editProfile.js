import styles from './editProfile.module.css';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { putEmployee } from 'redux/employees/thunks';
import { PUT_EMPLOYEES_SUCCESS } from 'redux/employees/constants';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidation } from './editProfileValidations';
import { Button, Modal, Input, Spinner } from 'Components/Shared/index';

const EditEmployeeProfile = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidation)
  });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const id = params.id;
  const { isLoading } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth.user);

  useEffect(async () => {
    if (userData) {
      reset({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password
      });
    }
  }, [userData]);

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

  if (isLoading) {
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
              label="Email"
              name="email"
              type="text"
              error={errors.email?.message}
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
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Password"
              name="password"
              type="password"
              error={errors.password?.message}
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

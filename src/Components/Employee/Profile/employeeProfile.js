import { useState, useEffect } from 'react';
import styles from './employeeProfile.module.css';
import { useHistory } from 'react-router-dom';
import { deleteEmployees, getEmployees } from 'redux/employees/thunks';
import { Button, Modal, Spinner } from 'Components/Shared';
import { logout } from 'redux/auth/thunks';
import { useSelector, useDispatch } from 'react-redux';

const EmployeeProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth.user);
  const { list: employees, isLoading: isLoadingEmployee } = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState(false);
  const id = userData._id;

  const [employeeProfile, setEmployeeProfile] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const currentEmployee = employees.find((employee) => employee._id === id);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    if (userData && currentEmployee) {
      setEmployeeProfile({
        name: currentEmployee.name,
        lastName: currentEmployee.lastName,
        email: currentEmployee.email,
        phone: currentEmployee.phone
      });
    }
  }, [userData, currentEmployee]);

  const goBack = () => {
    history.push('/auth/login');
  };

  const confirmationDelete = () => {
    dispatch(deleteEmployees(id));
    setShowModal(false);
    goBack();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const editProfile = (_id) => {
    history.push(`/employee/profile/editProfile/${_id}`);
  };

  if (isLoading || isLoadingEmployee) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={styles.container}>
      <Modal isOpen={showModal} handleClose={() => setShowModal(false)}>
        <div>
          <h3>Are you sure you want to delete this account?</h3>
        </div>
        <div>
          <Button onClick={() => setShowModal(false)} variant="cancel" name="Cancel" />
          <Button onClick={confirmationDelete} variant="confirm" name="Accept" />
        </div>
      </Modal>
      <div className={styles.bodyContainer}>
        <h2 className={styles.profile}>PROFILE</h2>
        <div className={styles.btnContainer}>
          <Button onClick={openModal} variant="cancel" name="Delete User" />
          <Button onClick={() => editProfile(id)} name="Edit Profile" variant="confirm" />
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.profileRow}>
            <h2 className={styles.header}>Name</h2>
            <p className={styles.data}>{employeeProfile.name}</p>
          </div>
          <div className={styles.profileRow}>
            <h2 className={styles.header}>Last Name</h2>
            <p className={styles.data}>{employeeProfile.lastName}</p>
          </div>
          <div className={styles.profileRow}>
            <h2 className={styles.header}>Email</h2>
            <p className={styles.data}>{employeeProfile.email}</p>
          </div>
          <div className={styles.profileRow}>
            <h2 className={styles.header}>Phone Number</h2>
            <p className={styles.data}>{employeeProfile.phone}</p>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button
            onClick={() => {
              dispatch(logout());
              history.push('/auth/login');
            }}
            variant="cancel"
            name="Logout"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

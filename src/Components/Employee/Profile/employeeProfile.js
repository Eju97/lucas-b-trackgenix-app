import { useEffect, useState } from 'react';
import styles from './employeeProfile.module.css';
import { useHistory } from 'react-router-dom';
import { deleteEmployees, getEmployees } from 'redux/employees/thunks';
import Button from 'Components/Shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'Components/Shared/Modal';
import SideBar from '../employeeSideBar';

const EmployeeProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = '637b87a63afa481d0759c6d0';
  const { isLoading } = useSelector((state) => state.employees);
  const currentEmployee = useSelector((state) =>
    state.employees.list.find((employee) => employee._id === id)
  );
  const [showModal, setShowModal] = useState(false);
  const [employeeProfile, setEmployeeProfile] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    if (id && currentEmployee) {
      setEmployeeProfile({
        name: currentEmployee.name,
        lastName: currentEmployee.lastName,
        email: currentEmployee.email,
        phone: currentEmployee.phone
      });
    }
  }, [currentEmployee]);

  const confirmationDelete = () => {
    dispatch(deleteEmployees(id));
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const editProfile = (_id) => {
    history.push(`/employee/profile/editProfile/${_id}`);
  };

  if (isLoading) {
    return <h2 className={styles.position}>Loading Profile...</h2>;
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
      <SideBar />
      <div className={styles.bodyContainer}>
        <div className={styles.subContainer}>
          <h2 className={styles.profile}>PROFILE</h2>
          <Button onClick={openModal} variant="cancel" name="Delete User" />
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
          <Button onClick={() => history.goBack()} name="Go Back" variant="cancel" />
          <Button onClick={() => editProfile(id)} name="Edit Profile" variant="confirm" />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

import { useEffect, useState } from 'react';
import styles from './employeeProfile.module.css';
import { useHistory } from 'react-router-dom';
import { getEmployees } from '../../../redux/employees/thunks';
import Button from '../../Shared/Button';
import { useSelector, useDispatch } from 'react-redux';

const EmployeeProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = '6379122be0921a237292eebb';
  const currentEmployee = useSelector((state) =>
    state.employees.list.find((employee) => employee._id === id)
  );
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

  const editProfile = (_id) => {
    history.push(`/employee/profile/editProfile/${_id}`);
  };
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.profile}>PROFILE</h2>
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.profileRow}>
          <label>Name</label>
          <h3>{employeeProfile.name}</h3>
        </div>
        <div className={styles.profileRow}>
          <label>Last Name</label>
          <h3>{employeeProfile.lastName}</h3>
        </div>
        <div className={styles.profileRow}>
          <label>Email</label>
          <h3>{employeeProfile.email}</h3>
        </div>
        <div className={styles.profileRow}>
          <label>Phone Number</label>
          <h3>{employeeProfile.phone}</h3>
        </div>
      </div>
      <div>
        <Button onClick={() => history.goBack()} name="Go Back" />
        <Button onClick={() => editProfile(id)} name="Edit Profile" />
      </div>
    </div>
  );
};

export default EmployeeProfile;

import { useEffect, useState } from 'react';
import styles from './admin.module.css';
import { useSelector } from 'react-redux';

const AdminProfile = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth.user);
  const [adminProfile, setAdminProfile] = useState({
    name: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (userData) {
      setAdminProfile({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email
      });
    }
  }, [userData]);

  if (isLoading) {
    return <h2 className={styles.position}>Loading Profile...</h2>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.bodyContainer}>
        <div className={styles.subContainer}>
          <h2 className={styles.profile}>PROFILE</h2>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.profileRow}>
            <h2 className={styles.header}>Name</h2>
            <p className={styles.data}>{adminProfile.name}</p>
          </div>
          <div className={styles.profileRow}>
            <h2 className={styles.header}>Last Name</h2>
            <p className={styles.data}>{adminProfile.lastName}</p>
          </div>
          <div className={styles.profileRow}>
            <h2 className={styles.header}>Email</h2>
            <p className={styles.data}>{adminProfile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

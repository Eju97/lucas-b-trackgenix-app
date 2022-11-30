import { useEffect, useState } from 'react';
import styles from './superAdmin.module.css';
import { useSelector } from 'react-redux';

const SuperAdminProfile = () => {
  const id = '637b87a63afa481d0759c6d0';
  const { isLoading } = useSelector((state) => state.auth);
  const userData = useSelector((state) => state.auth.user);
  const [superAdminProfile, setSuperAdminProfile] = useState({
    name: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    if (id && userData) {
      setSuperAdminProfile({
        name: userData.name,
        lastName: userData.last_name,
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
            <p className={styles.data}>{superAdminProfile.name}</p>
          </div>
          <div className={styles.profileRow}>
            <h2 className={styles.header}>Last Name</h2>
            <p className={styles.data}>{superAdminProfile.lastName}</p>
          </div>
          <div className={styles.profileRow}>
            <h2 className={styles.header}>Email</h2>
            <p className={styles.data}>{superAdminProfile.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminProfile;

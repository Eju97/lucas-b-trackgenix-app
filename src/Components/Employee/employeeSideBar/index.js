import styles from './employeeSideBar.module.css';
import { useHistory } from 'react-router-dom';

const SideBar = () => {
  const history = useHistory();
  return (
    <>
      <nav className={styles.navBarContainer}>
        <ul>
          <li onClick={() => history.push('/employee/home')}>Home</li>
          <li onClick={() => history.push('/employee/profile')}>Profile</li>
          <li onClick={() => history.push('/home')}>Log Out</li>
        </ul>
      </nav>
    </>
  );
};

export default SideBar;

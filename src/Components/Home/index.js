import styles from './home.module.css';
import { Button } from 'Components/Shared';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/thunks';
import { useHistory } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <section className={styles.container}>
      <Button
        onClick={() => {
          dispatch(logout());
          history.push('/auth/login');
        }}
        variant="cancel"
        name="Logout"
      />
    </section>
  );
}

export default Home;

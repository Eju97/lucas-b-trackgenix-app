import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import SuperAdmins from '../SuperAdmins/index';
import SuperAdminsForm from '../SuperAdminsForm/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import Projects from '../Projects';
import TimeSheets from '../TimeSheets';
import Tasks from '../Tasks/index';
import { React, useState } from 'react';

function Layout(props) {
  console.log(props.history);
  const [prueba, setPrueba] = useState(true);
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/super-admins':
      currentScreen = <SuperAdmins prueba={prueba} setPrueba={setPrueba} />;
      break;
    case '/super-admins/form':
      currentScreen = <SuperAdminsForm prueba={prueba} setPrueba={setPrueba} />;
      break;
    case '/employees':
      currentScreen = <Employees />;
      break;
    case '/projects':
      currentScreen = <Projects />;
      break;
    case '/time-sheets':
      currentScreen = <TimeSheets />;
      break;
    case '/tasks':
      currentScreen = <Tasks />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
}

export default Layout;

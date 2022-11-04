import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form';
import SuperAdmins from '../SuperAdmins/index';
import SuperAdminsForm from '../SuperAdminsForm/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import FormEmployee from '../Employees/FormEmployee/FormEmployee';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form/index';
import TimeSheets from '../TimeSheets';
import TimeSheetsForm from '../TimeSheets/Form/timesheetForm';
import Tasks from '../Tasks/index';
import TaskForm from '../Tasks/Form';
import React from 'react';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/admins/form':
      currentScreen = <AdminsForm />;
      break;
    case '/super-admins':
      currentScreen = <SuperAdmins />;
      break;
    case '/super-admins/form':
      currentScreen = <SuperAdminsForm />;
      break;
    case '/employees':
      currentScreen = <Employees />;
      break;
    case '/employees/form':
      currentScreen = <FormEmployee />;
      break;
    case '/projects':
      currentScreen = <Projects />;
      break;
    case '/projects/form':
      currentScreen = <ProjectsForm />;
      break;
    case '/time-sheets':
      currentScreen = <TimeSheets />;
      break;
    case '/tasks/form':
      currentScreen = <TaskForm />;
      break;
    case '/time-sheets/form':
      currentScreen = <TimeSheetsForm />;
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

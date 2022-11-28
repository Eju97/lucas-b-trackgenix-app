import React, { lazy } from 'react';
import styles from './layout.module.css';
// import Employees from '../Employees/index';
// import FormEmployee from '../Employees/FormEmployee/FormEmployee';
// import Projects from '../Projects';
// import ProjectsForm from '../Projects/Form/index';
// import TimeSheets from '../TimeSheets';
// import TimeSheetsForm from '../TimeSheets/Form/timesheetForm';
// import Tasks from '../Tasks/index';
// import TaskForm from '../Tasks/Form';
// import EmployeeSignUp from '../Employee/EmployeeSignUp/signUp';
// import EmployeeProfile from '../Employee/Profile/employeeProfile';
// import EditEmployeeProfile from '../Employee/EditProfile/editProfile';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import EmployeeHome from 'Components/Employee/Home/EmployeesHome';
// import NewTimesheet from 'Components/Employee/AddTimesheet/addTimesheet';
// import ProjectTable from 'Components/Employee/Home/projectTable';

const Header = lazy(() => import('Components/Header'));
const Footer = lazy(() => import('Components/Footer'));

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Header routes={props.routes} />
      <div>{props.children}</div>
      <Footer routes={props.routes} />
    </div>
  );
};
export default Layout;

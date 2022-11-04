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
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admins" component={Admins} />
          <Route path="/admins/form" component={AdminsForm} />
          <Route exact path="/super-admins" component={SuperAdmins} />
          <Route path="/super-admins/form" component={SuperAdminsForm} />
          <Route exact path="/employees" component={Employees} />
          <Route path="/employees/form" component={FormEmployee} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/form" component={ProjectsForm} />
          <Route exact path="/time-sheets" component={TimeSheets} />
          <Route path="/time-sheets/form" component={TimeSheetsForm} />
          <Route exact path="/tasks" component={Tasks} />
          <Route path="/tasks/form" component={TaskForm} />
          <Redirect to="/" />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default Layout;

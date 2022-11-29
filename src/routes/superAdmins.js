import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch, Redirect, Route, Switch } from 'react-router-dom';

const SuperAdmin = lazy(() => import('Components/SuperAdmins'));
const SuperAdminForm = lazy(() => import('Components/SuperAdminsForm'));
const AdminsForm = lazy(() => import('Components/Admins/Form'));
const Admins = lazy(() => import('Components/Admins'));
const Employees = lazy(() => import('Components/Employees'));
const EmployeeForm = lazy(() => import('Components/Employees/FormEmployee/FormEmployee'));
const Projects = lazy(() => import('Components/Projects/index'));
const ProjectsForm = lazy(() => import('Components/Projects/Form/index'));
const Tasks = lazy(() => import('Components/Tasks/index'));
const TasksForm = lazy(() => import('Components/Tasks/Form'));
const TimeSheets = lazy(() => import('Components/TimeSheets'));
const TimeSheetsForm = lazy(() => import('Components/TimeSheets/Form/timesheetForm'));
const Home = lazy(() => import('Components/Home'));

const routes = [
  { name: 'Home', path: '/super-admins/home' },
  { name: 'Super-Admins', path: '/super-admins' },
  { name: 'Employees', path: '/super-admins/employees' },
  { name: 'Projects', path: '/super-admins/projects' },
  { name: 'Tasks', path: '/super-admins/tasks' },
  { name: 'Timesheets', path: '/super-admins/time-sheets' },
  { name: 'Admins', path: '/super-admins/admins' }
];

const SuperAdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={SuperAdmin} />
        <Route exact path={`${url}/home`} component={Home} />
        <Route exact path={`${url}/form`} component={SuperAdminForm} />
        <Route exact path={`${url}/admins/form`} component={AdminsForm} />
        <Route exact path={`${url}/admins`} component={Admins} />
        <Route exact path={`${url}/employees`} component={Employees} />
        <Route path={`${url}/employees/form/:id`} component={EmployeeForm} />
        <Route exact path={`${url}/projects`} component={Projects} />
        <Route exact path={`${url}/projects/form`} component={ProjectsForm} />
        <Route path={`${url}/projects/form/:id`} component={ProjectsForm} />
        <Route exact path={`${url}/tasks`} component={Tasks} />
        <Route exact path={`${url}/tasks/form`} component={TasksForm} />
        <Route path={`${url}/tasks/form/:id`} component={TasksForm} />
        <Route exact path={`${url}/time-sheets`} component={TimeSheets} />
        <Route exact path={`${url}/time-sheets/form`} component={TimeSheetsForm} />
        <Route path={`${url}/time-sheets/form/:id`} component={TimeSheetsForm} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};
export default SuperAdminRoutes;

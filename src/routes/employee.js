import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const EmployeeHome = lazy(() => import('Components/Employee/Home/EmployeesHome'));
const NewTimesheet = lazy(() => import('Components/Employee/AddTimesheet/addTimesheet'));
const EmployeeProfile = lazy(() => import('Components/Employee/Profile/employeeProfile'));
const ProjectTable = lazy(() => import('Components/Employee/Home/projectTable'));
const EditEmployeeProfile = lazy(() => import('Components/Employee/EditProfile/editProfile'));
const Home = lazy(() => import('Components/Home'));
const routes = [
  { name: 'Home', path: '/employee/home/home' },
  { name: 'Timesheets', path: '/employee/timesheets' },
  { name: 'Profile', path: '/employee/profile' },
  { name: 'Projects', path: '/employee/home/projects' }
];

const EmployeesRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/home/projects`} component={ProjectTable} />
        <Route exact path={`${url}/timesheets`} component={EmployeeHome} />
        <Route exact path={`${url}/home/home`} component={Home} />
        <Route path={`${url}/home/newtimesheet/:id`} component={NewTimesheet} />
        <Route exact path={`${url}/profile`} component={EmployeeProfile} />
        <Route path={`${url}/profile/editProfile/:id`} component={EditEmployeeProfile} />
      </Switch>
    </Layout>
  );
};

export default EmployeesRouter;
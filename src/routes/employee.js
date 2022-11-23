import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const EmployeeHome = lazy(() => import('Components/Employee/Home'));
const EmployeeForm = lazy(() => import('Components/Employee/Form'));
const NewTimesheet = lazy(() => import('Components/Employee/AddTimesheet'));
const EmployeeProfile = lazy(() => import('Components/Employee/Profile'));

const routes = [
  { name: 'home', path: '/employee/home' },
  { name: 'timesheets', path: '/employees/timesheets/:id' }
];
const EmployeesRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={EmployeeHome} />
        <Route exact path={`${url}/form`} component={EmployeeForm} />
        <Route path={`${url}/form/:id`} component={EmployeeForm} />
        <Route path={`${url}/newtimesheet/:id`} component={NewTimesheet} />
        <Route path={`${url}/profile`} component={EmployeeProfile} />
      </Switch>
    </Layout>
  );
};

export default EmployeesRouter;

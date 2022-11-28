import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';

const Admins = lazy(() => import('Components/Admins'));
const AdminsForm = lazy(() => import('Components/Admins/Form'));

const routes = [
  { name: 'home', path: '/admins' },
  { name: 'timesheets', path: '/timesheets' },
  { name: 'projects', path: '/projects' },
  { name: 'tasks', path: '/tasks' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={Admins} />
        <Route exact path={`${url}/form`} component={AdminsForm} />
        <Route exact path={`${url}/form/:id`} component={AdminsForm} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;

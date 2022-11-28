import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';

const SuperAdmin = lazy(() => import('Components/SuperAdmins'));
const SuperAdminForm = lazy(() => import('Components/SuperAdminsForm'));
const routes = [{ name: 'Superadmins', path: '/super-admin' }];

const SuperAdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={SuperAdmin} />
        <Route exact path={`${url}/form/`} component={SuperAdminForm} />
        <Route path={`${url}/form/:id`} component={SuperAdminForm} />
      </Switch>
    </Layout>
  );
};
export default SuperAdminRoutes;

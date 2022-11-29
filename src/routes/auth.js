import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';

const AuthLogin = lazy(() => import('Components/Auth/Login'));

const routes = [{ name: 'Login', path: '/auth/login' }];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/login`} component={AuthLogin} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;

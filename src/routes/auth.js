import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';

const AuthLogin = lazy(() => import('Components/Auth/Login'));
const AuthSignUp = lazy(() => import('Components/Auth/SignUp'));

const routes = [
  { name: 'Login', path: '/auth/login' },
  { name: 'SignUp', path: '/auth/signup' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/login`} component={AuthLogin} />
        <Route exact path={`${url}/signup`} component={AuthSignUp} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;

import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const Landing = lazy(() => import('Components/Landing'));

const routes = [
  { name: 'Home', path: '/home' },
  { name: 'Login', path: '/auth/login' },
  { name: 'Sign Up', path: '/auth/signup' }
];
const HomeRoute = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route path={`${url}/`} component={Landing} />
      </Switch>
    </Layout>
  );
};

export default HomeRoute;

import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
const Home = lazy(() => import('Components/Landing'));

const routes = [{ name: 'home', path: '/home' }];
const HomeRoute = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route path={`${url}/home`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default HomeRoute;

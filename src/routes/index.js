import { tokenListener } from 'helpers/firebase';
import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';

const HomeRoute = lazy(() => import('./home'));
const Admins = lazy(() => import('./admins'));
const Employee = lazy(() => import('./employee'));
const Timesheets = lazy(() => import('./timesheets'));
const SuperAdmin = lazy(() => import('./superAdmins'));
const Auth = lazy(() => import('./auth'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading..</div>}>
        <Switch>
          <PrivateRoute path="/super-admins" role="SUPER_ADMIN" component={SuperAdmin} />
          <PrivateRoute path="/admins" role="ADMIN" component={Admins} />
          <PrivateRoute path="/employee" role="EMPLOYEE" component={Employee} />
          <Route path="/time-sheets" component={Timesheets} />
          <Route path="/home" component={HomeRoute} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/auth/login"></Redirect>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;

import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

const HomeRoute = lazy(() => import('./home'));
const Admins = lazy(() => import('./admins'));
const Employee = lazy(() => import('./employee'));
const Timesheets = lazy(() => import('./timesheets'));

const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading..</div>}>
        <Switch>
          <Route path="/admins" component={Admins} />
          <Route path="/employee" component={Employee} />
          <Route path="/time-sheets" component={Timesheets} />
          <Route path="/home" component={HomeRoute} />
          <Redirect to="/home"></Redirect>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;

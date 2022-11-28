import Layout from 'Components/Layout';
import React, { lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';

const TimeSheets = lazy(() => import('Components/TimeSheets'));
const TimeSheetForm = lazy(() => import('Components/TimeSheets/Form/timesheetForm'));
const routes = [{ name: 'timeSheets', path: '/time-sheets' }];

const TimeSheetsRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/`} component={TimeSheets} />
        <Route exact path={`${url}/form`} component={TimeSheetForm} />
        <Route path={`${url}/form/:id`} component={TimeSheetForm} />
      </Switch>
    </Layout>
  );
};

export default TimeSheetsRoutes;

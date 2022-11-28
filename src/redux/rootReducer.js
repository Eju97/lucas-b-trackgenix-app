import { combineReducers } from 'redux';

import adminsReducer from './admins/reducer';
import empolyeesReducer from './employees/reducer';
import projectsReducer from './projects/reducer';
import superAdminsReducer from './superAdmins/reducer';
import tasksReducer from './tasks/reducer';
import timesheetsReducer from './timesheets/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  employees: empolyeesReducer,
  admins: adminsReducer,
  projects: projectsReducer,
  superAdmins: superAdminsReducer,
  tasks: tasksReducer,
  timesheets: timesheetsReducer,
  auth: authReducer
});

export default rootReducer;

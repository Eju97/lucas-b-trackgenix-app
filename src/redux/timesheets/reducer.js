import { GET_TIMESHEETS_ERROR, GET_TIMESHEETS_PENDING, GET_TIMESHEETS_SUCCESS } from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const timesheetsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_TIMESHEETS_SUCCESS:
      return { ...state, list: action.payload, isLoading: false, error: false };
    case GET_TIMESHEETS_ERROR:
      return { ...state, list: [], isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default timesheetsReducer;

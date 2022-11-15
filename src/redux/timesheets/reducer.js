import {
  DELETE_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_SUCCESS,
  POST_TIMESHEETS_ERROR,
  PUT_TIMESHEET_PENDING,
  PUT_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_ERROR
} from './constants';

const INITIAL_STATE = {
  newTimesheet: {},
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
        error: false
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: false
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    case DELETE_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case DELETE_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((newtimesheet) => newtimesheet._id !== action.payload)],
        isLoading: false,
        error: false
      };
    case DELETE_TIMESHEETS_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    case POST_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case POST_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: ''
      };
    case POST_TIMESHEETS_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    case PUT_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case PUT_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.map((timesheet) => {
          if (timesheet._id === action.payload._id) {
            return action.payload;
          }
          return timesheet;
        }),
        isLoading: false,
        error: ''
      };
    case PUT_TIMESHEET_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default timesheetsReducer;

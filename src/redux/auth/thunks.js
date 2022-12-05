import {
  loginPending,
  loginError,
  logoutPending,
  logoutError,
  getUserPending,
  getUserError,
  getUserSuccess
} from './actions';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'helpers/firebase';

export const login = (inputData) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        inputData.email,
        inputData.password
      );

      const {
        token,
        claims: { role }
      } = await userCredentials.user.getIdTokenResult();

      sessionStorage.setItem('token', token);
      return role;
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutPending());
    return signOut(auth)
      .then(() => {
        sessionStorage.clear();
      })
      .catch((error) => {
        return dispatch(logoutError(error.toString()));
      });
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch(getUserPending());
    const token = sessionStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_URL}/getUserProfile`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getUserError(error.toString()));
      });
  };
};

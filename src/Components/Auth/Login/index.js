import React from 'react';
import styles from '../Login/login.module.css';
import { useForm } from 'react-hook-form';
import { Button, Input, Spinner } from 'Components/Shared';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from 'redux/auth/thunks';
import { loginValidation } from 'Components/Auth/Login/validations';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.auth.error);
  const { isLoading } = useSelector((state) => state.employees);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(loginValidation)
  });

  const onSubmit = async (inputData) => {
    if (Object.values(errors).length === 0) {
      const role = await dispatch(login(inputData));
      if (role) {
        switch (role) {
          case 'SUPER_ADMIN':
            history.push('/super-admins');
            break;
          case 'ADMIN':
            history.push('/admins');
            break;
          case 'EMPLOYEE':
            history.push('/employee');
            break;
          default:
            history.push('/auth/login');
        }
      }
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={styles.container}>
      <h2>Welcome</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          id="email"
          name="email"
          register={register}
          error={errors.email?.message}
          required
          type="text"
        />
        <Input
          label="Password"
          id="password"
          name="password"
          register={register}
          required
          error={errors.password?.message}
          type="password"
        />
        <div className={styles.btnContainer}>
          <Button type="submit" variant="confirm" name="Sign In" />
        </div>
      </form>
    </div>
  );
};

export default Login;

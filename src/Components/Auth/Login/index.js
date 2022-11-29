import React from 'react';
import styles from '../Login/login.module.css';
import { useForm } from 'react-hook-form';
import { Button, Input } from 'Components/Shared';
// import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from 'redux/auth/thunks';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.auth.error);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    //mode: 'onBlur'
  });

  const onSubmit = async (inputData) => {
    if (Object.values(errors).length === 0) {
      const role = await dispatch(login(inputData));
      console.log(role);
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

  return (
    <div className={styles.container}>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          id="email"
          name="email"
          register={register}
          error={errors.email?.message}
          type="text"
        />
        <Input
          label="Password"
          id="password"
          name="password"
          register={register}
          error={errors.password?.message}
          type="password"
        />
        <Button type="submit" variant="confirm" name="Sign In" />
      </form>
    </div>
  );
};

export default Login;

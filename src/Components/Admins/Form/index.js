import styles from './form.module.css';
import { useEffect, useState } from 'react';
import Button from 'Components/Shared/Button';
import { useParams, useHistory } from 'react-router-dom';
import Input from 'Components/Shared/Input/Input';
import { useSelector, useDispatch } from 'react-redux';
import { createAdmin, editAdmin } from 'redux/admins/thunks';
import { useForm } from 'react-hook-form';
import { Schema } from 'Components/Admins/Form/validations';
import { joiResolver } from '@hookform/resolvers/joi';
import { POST_ADMINS_FULLFILLED, PUT_ADMINS_FULLFILLED } from 'redux/admins/constants';

const Form = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(Schema)
  });

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admins);
  const history = useHistory();
  const params = useParams();
  const adminId = params.id;
  const currentAdmin = useSelector((state) =>
    state.admins.list.find((admin) => admin._id === params.id)
  );
  const [inputForm, setInputForm] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(async () => {
    if (adminId && currentAdmin) {
      setValue('name', currentAdmin.name);
      setValue('lastName', currentAdmin.lastName);
      setValue('email', currentAdmin.email);
      setValue('password', currentAdmin.password);
      setInputForm({
        name: currentAdmin.name,
        lastName: currentAdmin.lastName,
        email: currentAdmin.email,
        password: currentAdmin.password
      });
    }
  }, [currentAdmin]);

  const onSubmit = async (data) => {
    setInputForm({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    });
    if (adminId) {
      const response = await dispatch(editAdmin(adminId, data));
      if (response.type === PUT_ADMINS_FULLFILLED) {
        alert('Admin Updated');
        history.push('/admins');
      }
    } else {
      const response = await dispatch(createAdmin(data));
      if (response.type === POST_ADMINS_FULLFILLED) {
        alert('Admin Created');
        history.push('/admins');
      }
    }
  };

  const resetImputs = () => {
    reset(inputForm);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className={styles.container}>
        <h2>{adminId ? 'Edit Admin' : 'Create Admin'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            label="Name"
            name="name"
            type="text"
            placeholder="add First Name"
            error={errors.name?.message}
          />
          <Input
            register={register}
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="add Last Name"
            error={errors.lastName?.message}
          />
          <Input
            register={register}
            label="Email"
            name="email"
            type="email"
            placeholder="add Email"
            error={errors.email?.message}
          />
          <Input
            register={register}
            label="Password"
            name="password"
            type="password"
            placeholder="add Password"
            error={errors.password?.message}
          />
          <Button type="submit" variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
          <Button onClick={() => resetImputs()} type="button" variant="confirm" name="Reset" />
        </form>
      </div>
    </>
  );
};

export default Form;

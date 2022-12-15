import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './super-admins-form.module.css';
import { Input, Button } from 'Components/Shared/index';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmins, putSuperAdmins } from 'redux/superAdmins/thunks';
import { useForm } from 'react-hook-form';
import { Schema } from 'Components/SuperAdminsForm/validations';
import { joiResolver } from '@hookform/resolvers/joi';
import { PUT_SUPERADMINS_SUCCESS, POST_SUPERADMINS_SUCCESS } from 'redux/superAdmins/constants';

function SuperAdminsForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(Schema)
  });

  const { isLoading } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const id = params.id;

  const currentSuperAdmin = useSelector((state) =>
    state.superAdmins.list.find((superAdmin) => superAdmin._id === params.id)
  );

  useEffect(() => {
    if (id && currentSuperAdmin) {
      reset({
        name: currentSuperAdmin.name,
        last_name: currentSuperAdmin.last_name,
        email: currentSuperAdmin.email,
        password: currentSuperAdmin.password
      });
    }
  }, [currentSuperAdmin]);

  const onSubmit = async (data) => {
    if (id) {
      const response = await dispatch(putSuperAdmins(id, data));
      if (response.type === PUT_SUPERADMINS_SUCCESS) {
        alert('Super Admin Updated');
        history.goBack();
      }
    } else {
      const response = await dispatch(postSuperAdmins(data));
      if (response.type === POST_SUPERADMINS_SUCCESS) {
        alert('Super Admin Created');
        history.goBack();
      }
    }
  };

  const resetImputs = () => {
    reset();
  };

  if (isLoading) {
    return <h2 className={styles.position}>Loading...</h2>;
  }

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{id ? 'Edit SuperAdmin' : 'Create SuperAdmin'}</h2>
        <div className={styles.inputs}>
          <Input
            register={register}
            label="Name"
            name="name"
            type="text"
            placeholder="add First Name"
            error={errors.name?.message}
          />
        </div>
        <div className={styles.inputs}>
          <Input
            register={register}
            label="Last Name"
            name="last_name"
            type="text"
            placeholder="add Last Name"
            error={errors.last_name?.message}
          />
        </div>
        <div className={styles.inputs}>
          <Input
            register={register}
            label="Email"
            name="email"
            type="email"
            placeholder="add Email"
            error={errors.email?.message}
          />
        </div>
        <div className={styles.inputs}>
          <Input
            register={register}
            label="Password"
            name="password"
            type="password"
            placeholder="add Password"
            error={errors.password?.message}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button type="submit" variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
          <Button onClick={() => resetImputs()} type="button" variant="confirm" name="Reset" />
        </div>
      </form>
    </section>
  );
}

export default SuperAdminsForm;

import styles from './form.module.css';
import { useEffect } from 'react';
import { Button, Input, Spinner } from 'Components/Shared/index';
import { useParams, useHistory } from 'react-router-dom';
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
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(Schema)
  });

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.admins);
  const history = useHistory();
  const params = useParams();
  const adminId = params.id;
  const currentAdmin = useSelector((state) =>
    state.admins.list.find((admin) => admin?._id === params.id)
  );

  useEffect(async () => {
    if (adminId && currentAdmin) {
      reset({
        name: currentAdmin.name,
        lastName: currentAdmin.lastName,
        email: currentAdmin.email,
        password: currentAdmin.password
      });
    }
  }, [currentAdmin]);

  const onSubmit = async (data) => {
    if (adminId) {
      const response = await dispatch(editAdmin(adminId, data));
      if (response.type === PUT_ADMINS_FULLFILLED) {
        alert('Admin Updated');
        history.goBack();
      }
    } else {
      const response = await dispatch(createAdmin(data));
      if (response.type === POST_ADMINS_FULLFILLED) {
        alert('Admin Created');
        history.goBack();
      }
    }
  };

  const resetImputs = () => {
    reset();
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsBox}>
            <h2>{adminId ? 'Edit Admin' : 'Create Admin'}</h2>
            <div className={styles.inputs}>
              <Input
                register={register}
                label="Name"
                name="name"
                required
                error={errors.name?.message}
              />
            </div>
            <div className={styles.inputs}>
              <Input
                register={register}
                label="Last Name"
                name="lastName"
                type="text"
                required
                error={errors.lastName?.message}
              />
            </div>
            <div className={styles.inputs}>
              <Input
                register={register}
                label="Email"
                name="email"
                required
                error={errors.email?.message}
              />
            </div>
            <div className={styles.inputs}>
              <Input
                register={register}
                label="Password"
                name="password"
                type="password"
                required
                error={errors.password?.message}
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button type="submit" variant="confirm" name="Submit" />
            <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
            <Button onClick={() => resetImputs()} type="button" variant="reset" name="Reset" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;

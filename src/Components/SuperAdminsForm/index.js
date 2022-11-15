import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './super-admins-form.module.css';
import Input from '../Shared/Input/Input';
import Button from '../Shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import { postSuperAdmins, putSuperAdmins, getSuperAdmins } from '../../redux/superAdmins/thunks';
import {
  POST_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_SUCCESS
} from '../../redux/superAdmins/constants';

function SuperAdminsForm() {
  const { isLoading, error } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const id = params.id;
  const formMode = id ? 'edit' : 'create';
  const [inputData, setInputData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const currentSuperAdmin = useSelector((state) =>
    state.superAdmins.list.find((superAdmin) => superAdmin._id === params.id)
  );

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  useEffect(() => {
    if (id && currentSuperAdmin) {
      setInputData({
        name: currentSuperAdmin.name,
        last_name: currentSuperAdmin.last_name,
        email: currentSuperAdmin.email,
        password: currentSuperAdmin.password
      });
    }
  }, [currentSuperAdmin]);

  const onSubmit = async () => {
    if (formMode === 'edit') {
      const response = await dispatch(putSuperAdmins(id, inputData));
      if (response.type === PUT_SUPERADMINS_SUCCESS) {
        history.push('/super-admins');
      }
    } else {
      const response = await dispatch(postSuperAdmins(inputData));
      if (response.type === POST_SUPERADMINS_SUCCESS) {
        history.push('/super-admins');
      }
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className={styles.container}>
      <form>
        <div className={styles.inputs}>
          <Input
            label="Name"
            onChange={(e) => {
              setInputData({ ...inputData, name: e.target.value });
            }}
            type="text"
            value={inputData.name}
          />
        </div>
        <div className={styles.inputs}>
          <Input
            label="Last Name"
            onChange={(e) => {
              setInputData({ ...inputData, last_name: e.target.value });
            }}
            type="text"
            value={inputData.last_name}
          />
        </div>
        <div className={styles.inputs}>
          <Input
            label="Email"
            onChange={(e) => {
              setInputData({ ...inputData, email: e.target.value });
            }}
            type="email"
            value={inputData.email}
          />
        </div>
        <div className={styles.inputs}>
          <Input
            label="Password"
            onChange={(e) => {
              setInputData({ ...inputData, password: e.target.value });
            }}
            type="text"
            value={inputData.password}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={onSubmit} variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
        </div>
      </form>
    </section>
  );
}

export default SuperAdminsForm;

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './super-admins-form.module.css';
import Input from '../Shared/Input/Input';
import Button from '../Shared/Button';
import { useDispatch } from 'react-redux';
import { postSuperAdmins } from '../../redux/superAdmins/thunks';

function SuperAdminsForm() {
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setInputData({
            name: data.data.name,
            last_name: data.data.last_name,
            email: data.data.email,
            password: data.data.password
          });
        });
    }
  }, []);

  const onSubmit = async () => {
    if (formMode === 'edit') {
      return onEditSuperAdmin();
    }
    await dispatch(postSuperAdmins(inputData));
    history.push('/super-admins');
  };

  /*  const onCreateSuperAdmin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
        history.push('/super-admins');
      })
      .catch((error) => {
        alert(error);
      });
  }; */

  const onEditSuperAdmin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response.message);
        history.push('/super-admins');
      })
      .catch((error) => {
        alert(error);
      });
  };

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
          <Button onClick={onSubmit} variant="confirm" name="Create" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
        </div>
      </form>
    </section>
  );
}

export default SuperAdminsForm;

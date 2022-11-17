import styles from './form.module.css';
import { useState, useEffect } from 'react';
import Button from '../../Shared/Button';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../Shared/Input/Input';
import { useSelector, useDispatch } from 'react-redux';
import { createAdmin, editAdmin, getAdmins } from '../../../redux/admins/thunks';
import { POST_ADMINS_FULLFILLED, PUT_ADMINS_FULLFILLED } from '../../../redux/admins/constants';

const Form = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.admins);
  const history = useHistory();
  const params = useParams();
  const adminId = params.id;
  const [formValues, setFormValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const currentAdmin = useSelector((state) =>
    state.admins.list.find((admin) => admin._id === params.id)
  );

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  useEffect(async () => {
    if (adminId && currentAdmin) {
      try {
        setFormValues({
          name: currentAdmin.name,
          lastName: currentAdmin.lastName,
          email: currentAdmin.email,
          password: currentAdmin.password
        });
      } catch (error) {
        alert(error);
      }
    }
  }, [currentAdmin]);

  const onCreateAdmin = async () => {
    const response = await dispatch(createAdmin(formValues));
    if (response.type === POST_ADMINS_FULLFILLED) {
      history.push('/admins');
    }
  };

  const onEditAdmin = async () => {
    const response = await dispatch(editAdmin(adminId, formValues));
    if (response.type === PUT_ADMINS_FULLFILLED) {
      history.push('/admins');
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <div className={styles.container}>
        <h2>{adminId ? 'Edit Admin' : 'Create Admin'}</h2>
        <form>
          <Input
            label="Name"
            type="text"
            placeholder="add First Name"
            value={formValues.name}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                name: e.target.value
              });
            }}
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="add Last Name"
            value={formValues.lastName}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                lastName: e.target.value
              });
            }}
          />
          <Input
            label="Email"
            type="email"
            placeholder="add Email"
            value={formValues.email}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                email: e.target.value
              });
            }}
          />
          <Input
            label="Password"
            type="password"
            placeholder="add Password"
            value={formValues.password}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                password: e.target.value
              });
            }}
          />
          <Button
            onClick={adminId ? () => onEditAdmin() : () => onCreateAdmin()}
            variant="confirm"
            name="Submit"
          />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
        </form>
      </div>
    </>
  );
};

export default Form;

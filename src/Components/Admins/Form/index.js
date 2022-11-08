import styles from './form.module.css';
import { useState, useEffect } from 'react';
import Modal from '../../Shared/Modal';
import Button from '../../Shared/Button';
import { useParams, useHistory } from 'react-router-dom';
import Input from '../../Shared/Input/Input';

const Form = () => {
  const history = useHistory();
  const params = useParams();
  const adminId = params.id;
  const [formValues, setFormValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(async () => {
    if (adminId) {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`);
        const data = await res.json();
        setFormValues({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const createAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
      const data = await response.json();
      setContentMessage(data.message);
      if (response.ok) {
        setModalTitle('Success');
      } else {
        setModalTitle('Error');
      }
      setShowModal(true);
    } catch (error) {
      alert(error);
    }
  };

  const editAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
      const data = await response.json();
      setContentMessage(data.message);
      if (response.ok) {
        setModalTitle('Success');
      } else {
        setModalTitle('Error');
      }
      setShowModal(true);
    } catch (error) {
      alert(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
            onClick={adminId ? () => editAdmin() : () => createAdmin()}
            variant="confirm"
            name="Submit"
          />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
        </form>
      </div>
      <Modal isOpen={showModal} handleClose={closeModal}>
        <div>
          <h3>{modalTitle}</h3>
        </div>
        <div>{contentMessage && <p>{contentMessage}</p>}</div>
        <div>
          <Button
            onClick={() => {
              setShowModal(false);
              if (modalTitle !== 'Error') {
                window.location.assign(`/admins`);
              }
            }}
            variant="cancel"
            name="Close"
          />
        </div>
      </Modal>
    </>
  );
};

export default Form;

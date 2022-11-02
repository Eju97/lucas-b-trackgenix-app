import styles from './form.module.css';
import { useState, useEffect } from 'react';
import ModalWarning from '../ModalWarning';

const Form = () => {
  const [error, setError] = useState();
  const paramsURL = new URLSearchParams(window.location.search);
  const adminId = paramsURL.get('id');
  const [adminCreate, setAdminCreated] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [title, setTitle] = useState();
  const [contentMessage, setContentMessage] = useState();
  const [showModal, setShowModal] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setAdminCreated({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });
  };

  useEffect(async () => {
    if (adminId) {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`);
        const data = await res.json();
        setAdminCreated({
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: adminCreate.name,
        lastName: adminCreate.lastName,
        email: adminCreate.email,
        password: adminCreate.password
      })
    });
    const data = await response.json();
    if (!data.error) {
      window.location.assign('/admins');
    } else {
      setError(data.message);
    }
  };

  const editAdmin = async (adminId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: adminCreate.name,
          lastName: adminCreate.lastName,
          email: adminCreate.email,
          password: adminCreate.password
        })
      });
    } catch (error) {
      console.log(error);
    }
    if (!adminCreate.name || !adminCreate.lastName || !adminCreate.email || !adminCreate.password) {
      setTitle('Edit Admin');
      setContentMessage('Admin Error');
      setShowModal(true);
    } else {
      setTitle('Edit Admin');
      setContentMessage('Admin successfully edited');
      setShowModal(true);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Create Admin</h2>
        <h3>{error}</h3>
        <form onSubmit={onSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="add First Name"
              onChange={(e) => {
                setAdminCreated({
                  ...adminCreate,
                  name: e.target.value
                });
              }}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="add Last Name"
              onChange={(e) => {
                setAdminCreated({
                  ...adminCreate,
                  lastName: e.target.value
                });
              }}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="add Email"
              onChange={(e) => {
                setAdminCreated({
                  ...adminCreate,
                  email: e.target.value
                });
              }}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="add Password"
              onChange={(e) => {
                setAdminCreated({
                  ...adminCreate,
                  password: e.target.value
                });
              }}
            />
          </div>
          <input
            type="submit"
            value="Create"
            onClick={adminId ? () => editAdmin(adminId) : () => createAdmin()}
          />
        </form>
      </div>
      <ModalWarning
        title={title}
        contentMessage={contentMessage}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Form;

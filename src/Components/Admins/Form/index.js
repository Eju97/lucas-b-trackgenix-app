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
  const [showModal, setShowModal] = useState(false);

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
      body: JSON.stringify(adminCreate)
    });
    const data = await response.json();
    if (!data.error) {
      window.location.assign('/admins');
    } else {
      setError(data.message);
    }
  };

  const editAdmin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminCreate)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Create Admin</h2>
        <h3>{error}</h3>
        <form>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="add First Name"
              value={adminCreate.name}
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
              value={adminCreate.lastName}
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
              value={adminCreate.email}
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
              value={adminCreate.password}
              onChange={(e) => {
                setAdminCreated({
                  ...adminCreate,
                  password: e.target.value
                });
              }}
            />
          </div>
          <input
            type="button"
            value="Create"
            onClick={adminId ? () => editAdmin() : () => createAdmin()}
          />
        </form>
      </div>
      <ModalWarning showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Form;

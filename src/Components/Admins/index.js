import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';

const Admins = () => {
  const history = useHistory();
  const [listAdmins, setListAdmin] = useState([]);
  const [modalDisplay, setShowModal] = useState(false);
  const [adminId, setAdminId] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setListAdmin(response.data);
      });
  }, []);

  const deleteAdmin = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setListAdmin(listAdmins.filter((admin) => admin._id !== _id));
      }
    } catch (error) {
      alert(error);
    }
  };

  const onDelete = (_id, modalDisplay) => {
    setAdminId(_id);
    setShowModal(modalDisplay);
  };

  const onRowClick = (_id) => {
    history.push(`/admins/form/${_id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onConfirmModal = () => {
    deleteAdmin(adminId);
    setShowModal(false);
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Admins</h2>
        <Table
          data={listAdmins}
          headers={['name', 'lastName', 'email', 'password', 'Delete']}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
        <div className={styles.containerButton}>
          <button
            className={styles.buttonAdd}
            type="button"
            onClick={() => history.push('/admins/form')}
          >
            Create
          </button>
        </div>
      </section>
      <Modal isOpen={modalDisplay} handleClose={closeModal}>
        <div>
          <h3>Do you really want to delete this Admin?</h3>
        </div>
        <div>
          <Button onClick={closeModal} variant="cancel" name="Cancel" />
          <Button onClick={onConfirmModal} variant="confirm" name="Accept" />
        </div>
      </Modal>
    </>
  );
};

export default Admins;

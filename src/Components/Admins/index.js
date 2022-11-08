import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';

const Admins = () => {
  const urlForm = '/admins/form/';
  const [listAdmins, setListAdmin] = useState([]);
  const [modalDisplay, setShowModal] = useState(false);
  const [adminId] = useState();

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
          deleteId={deleteAdmin}
          showModal={setShowModal}
          urlForm={urlForm}
        />
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

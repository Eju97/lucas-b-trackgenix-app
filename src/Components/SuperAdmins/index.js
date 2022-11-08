import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Modal from '../Shared/Modal';
import Table from '../Shared/Table';
import Button from '../Shared/Button';

const SuperAdmins = () => {
  const urlForm = '/super-admins/form/';
  const [superAdminList, setSuperAdminList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/`)
      .then((res) => res.json())
      .then((data) => {
        setSuperAdminList(data.data);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const onDeleteTask = () => {
    handleDelete(selectedId);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperAdminList([...superAdminList.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <div className={styles.container}>
      <Table
        data={superAdminList}
        headers={['name', 'last_name', 'email', 'password']}
        urlForm={urlForm}
        showModal={setShowModal}
        deleteId={setSelectedId}
      />
      <Modal handleClose={closeModal} isOpen={showModal}>
        <div>
          <h3>Do you really want to delete this Super Admin?</h3>
        </div>
        <div>
          <Button onClick={closeModal} variant="cancel" name="Cancel" />
          <Button onClick={onDeleteTask} variant="confirm" name="Accept" />
        </div>
      </Modal>
      ;
    </div>
  );
};

export default SuperAdmins;

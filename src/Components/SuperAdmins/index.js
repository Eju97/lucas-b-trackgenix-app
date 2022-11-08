//import List from './List/List';
import styles from './super-admins.module.css';
import React, { useEffect, useState } from 'react';
import Modal from './Modal/Modal';
import Table from '../Shared/Table';

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
        headers={['name', 'lastName', 'email', 'password', 'Delete']}
        urlForm={urlForm}
        showModal={setShowModal}
        deleteId={setSelectedId}
      />
      <Modal closeModal={closeModal} showModal={showModal} handleDelete={onDeleteTask} />
    </div>
  );
};

export default SuperAdmins;

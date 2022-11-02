import List from './List/List';
import React, { useEffect, useState } from 'react';
import Modal from './Modal/Modal';

const SuperAdmins = () => {
  const [SuperAdminsList, setSuperAdminsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/`)
      .then((res) => res.json())
      .then((data) => {
        setSuperAdminsList(data.data);
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
    setSuperAdminsList([...SuperAdminsList.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <div>
      <List
        SuperAdminsList={SuperAdminsList}
        setSuperAdminsList={setSuperAdminsList}
        showModal={showModal}
        setVisible={setVisible}
        visible={visible}
        setShowModal={setShowModal}
        setSelectedId={setSelectedId}
      />
      <Modal
        closeModal={closeModal}
        showModal={showModal}
        handleDelete={onDeleteTask}
        setVisible={setVisible}
      />
    </div>
  );
};

export default SuperAdmins;

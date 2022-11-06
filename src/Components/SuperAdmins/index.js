import List from './List/List';
import React, { useEffect, useState } from 'react';
import Modal from '../Shared/Modal';

const SuperAdmins = () => {
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
    <div>
      <List
        superAdminList={superAdminList}
        setSuperAdminList={setSuperAdminList}
        showModal={showModal}
        setShowModal={setShowModal}
        setSelectedId={setSelectedId}
      />
      <Modal handleClose={closeModal} isOpen={showModal}>
        <div>
          <h3>You sure want to delete it?</h3>
        </div>
        <div>
          <button onClick={closeModal}>Close</button>
          <button onClick={onDeleteTask}>Delete</button>
        </div>
      </Modal>
      ;
    </div>
  );
};

export default SuperAdmins;

import React, { useState } from 'react';
import Modal from './Modal/modalIndex';

const ListTask = ({ listTask, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <tr>
      <td>{listTask.description}</td>
      <td>
        <button onClick={openModal}>X</button>
        <Modal
          listTask={listTask}
          closeModal={closeModal}
          showModal={showModal}
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

export default ListTask;

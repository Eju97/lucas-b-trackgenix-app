import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Modal from '../Shared/Modal';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';

const SuperAdmins = () => {
  const history = useHistory();
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

  const onDelete = (_id, modalDisplay) => {
    setSelectedId(_id);
    setShowModal(modalDisplay);
  };

  const onRowClick = (_id) => {
    history.push(`/super-admins/form/${_id}`);
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperAdminList([...superAdminList.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <div className={styles.container}>
      <div>
        <Table
          data={superAdminList}
          headers={['name', 'last_name', 'email', 'password']}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
        <div className={styles.containerButton}>
          <button
            className={styles.buttonAdd}
            type="button"
            onClick={() => history.push('/super-admins/form')}
          >
            Create
          </button>
        </div>
      </div>
      <Modal handleClose={closeModal} isOpen={showModal}>
        <div>
          <h3>Do you really want to delete this Super Admin?</h3>
        </div>
        <div>
          <Button onClick={closeModal} variant="cancel" name="Cancel" />
          <Button onClick={onDeleteTask} variant="confirm" name="Accept" />
        </div>
      </Modal>
    </div>
  );
};

export default SuperAdmins;

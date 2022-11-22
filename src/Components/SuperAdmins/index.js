import React, { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Modal from 'Components/Shared/Modal';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmins } from 'redux/superAdmins/thunks';

const SuperAdmins = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const { list: superAdminList, isLoading, error } = useSelector((state) => state.superAdmins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);
  if (isLoading) {
    return <h2 className={styles.position}>Loading...</h2>;
  }
  if (error) {
    return <h2 className={styles.position}>{error}</h2>;
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const onDeleteTask = () => {
    dispatch(deleteSuperAdmins(selectedId));
    setShowModal(false);
  };

  const onDelete = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const onRowClick = (_id) => {
    history.push(`/super-admins/form/${_id}`);
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

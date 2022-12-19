import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import { Table, Modal, Button } from 'Components/Shared/index';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAdmin, getAdmins } from 'redux/admins/thunks';

const Admins = () => {
  const history = useHistory();
  const [adminsList, setListAdmin] = useState([]);
  const { list: adminList, isLoading, error } = useSelector((state) => state.admins);
  const dispatch = useDispatch();
  const [modalDisplay, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const onDelete = (_id) => {
    setListAdmin(_id);
    setShowModal(true);
  };

  const onRowClick = (_id) => {
    history.push(`admins/form/${_id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onConfirmModal = () => {
    dispatch(deleteAdmin(adminsList));
    setShowModal(false);
  };

  return (
    <>
      <section className={styles.container}>
        <h2>Admins</h2>
        <Table
          data={adminList}
          headers={['name', 'lastName', 'email']}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
        <div className={styles.containerButton}>
          <Button
            type="submit"
            variant="confirm"
            onClick={() => history.push(`admins/form`)}
            name="Create +"
          />
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

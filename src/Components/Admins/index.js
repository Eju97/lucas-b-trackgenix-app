import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Modal from './Modal/modal';
// import { useHistory } from 'react-router-dom';

const Admins = () => {
  // const history = useHistory();
  const [listAdmins, setListAdmin] = useState([]);
  const [modalDisplay, setShowModal] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setListAdmin(response.data);
      });
  }, []);
  const deleteAdmin = async (_id) => {
    if (confirm('Are you sure that you want to delete this Admin?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
          method: 'DELETE'
        });
        setListAdmin([...listAdmins.filter((listAdmin) => listAdmin._id !== _id)]);
        const data = await response.json();
        setContentMessage(data.message);
        if (response.ok) {
          setListAdmin(listAdmins.filter((admin) => admin._id !== _id));
          setModalTitle('Success');
        } else {
          setModalTitle('Error');
        }
        setShowModal(true);
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <>
      <section className={styles.container}>
        <h2>Admins</h2>
        <Table
          data={listAdmins}
          headers={['name', 'lastName', 'email', 'password', 'Delete']}
          deleteAdmin={deleteAdmin}
          showModal={setShowModal}
        />
      </section>
      {modalDisplay ? (
        <Modal title={modalTitle} contentMessage={contentMessage} setShowModal={setShowModal} />
      ) : null}
    </>
  );
};

export default Admins;

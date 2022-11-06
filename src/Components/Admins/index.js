import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Modal from '../Shared/Modal';

const Admins = () => {
  const [listAdmins, setListAdmin] = useState([]);
  const [modalDisplay, setShowModal] = useState(false);
  const [adminId, setAdminId] = useState();

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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          {listAdmins.map((admin) => {
            return (
              <tbody key={admin._id}>
                <tr onClick={() => window.location.assign(`/admins/form?id=${admin._id}`)}>
                  <td>{admin.name}</td>
                  <td>{admin.lastName}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setAdminId(admin._id);
                        setShowModal(true);
                      }}
                    >
                      x
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
          <tfoot>
            <button type="button" onClick={() => window.location.assign(`/admins/form?`)}>
              Create
            </button>
          </tfoot>
        </table>
      </section>
      <Modal isOpen={modalDisplay} handleClose={closeModal}>
        <div>
          <h3>Do you really want to delete this Admin?</h3>
        </div>
        <div>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={onConfirmModal}>Accept</button>
        </div>
      </Modal>
    </>
  );
};

export default Admins;

import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import DeleteConfirmationModal from './ModalDelete';

const Admins = () => {
  const [admins, listAdmin] = useState([]);
  const [adminId, setAdminId] = useState();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        listAdmin(response.data);
        console.log(response.data);
      });
  }, []);
  const deleteAdmin = async (_id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!data.error) {
      listAdmin([...admins.filter((admin) => admin._id !== _id)]);
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const adminDelete = () => {
    deleteAdmin(adminId);
  };
  return (
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
        {admins.map((admin) => {
          return (
            <tbody key={admin._id}>
              <tr>
                <td>{admin.name}</td>
                <td>{admin.lastName}</td>
                <td>{admin.email}</td>
                <button
                  onClick={() => {
                    setAdminId(admin._id);
                    setShowModal(true);
                  }}
                >
                  x
                </button>
              </tr>
            </tbody>
          );
        })}
      </table>
      <DeleteConfirmationModal
        adminDelete={adminDelete}
        showModal={showModal}
        closeModal={closeModal}
      />
    </section>
  );
};

export default Admins;

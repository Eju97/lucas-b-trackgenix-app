import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import DeleteConfirmationModal from './ModalDelete';

const Admins = () => {
  const [listAdmins, setListAdmin] = useState([]);
  const [adminId, setAdminId] = useState();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setListAdmin(response.data);
      });
  }, []);
  const deleteAdmin = async (_id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${_id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    if (!data.error) {
      setListAdmin([...listAdmins.filter((admin) => admin._id !== _id)]);
      setShowModal(false);
    }
  };
  const onCloseModal = () => {
    setShowModal(false);
  };
  const onDeleteAdmin = () => {
    deleteAdmin(adminId);
    setShowModal(false);
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
      </table>
      <DeleteConfirmationModal
        onDeleteAdmin={onDeleteAdmin}
        showModal={showModal}
        onCloseModal={onCloseModal}
      />
    </section>
  );
};

export default Admins;

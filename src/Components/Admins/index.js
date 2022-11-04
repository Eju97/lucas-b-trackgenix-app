import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Modal from './Modal/modal';
import { Link } from 'react-router-dom';

const Admins = () => {
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
                        deleteAdmin(admin._id);
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
            <Link to="/admins/form">Create</Link>
          </tfoot>
        </table>
      </section>
      {modalDisplay ? (
        <Modal title={modalTitle} contentMessage={contentMessage} setShowModal={setShowModal} />
      ) : null}
    </>
  );
};

export default Admins;

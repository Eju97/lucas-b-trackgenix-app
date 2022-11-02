import styles from './ListItem.module.css';
import React from 'react';

const ListItem = ({ listItem, setShowModal, setSelectedId, showModal, visible, setVisible }) => {
  console.log(showModal);
  console.log(visible);
  const onDeleteIconClick = () => {
    setShowModal(true);
    setSelectedId(listItem._id);
    setVisible(true);
  };
  return (
    <tr
      onClick={() => {
        if (visible && !showModal) {
          window.location.assign(`/super-admins/form?id=${listItem._id}`);
        }
      }}
    >
      <td>{listItem.name}</td>
      <td>{listItem.last_name}</td>
      <td>{listItem.email}</td>
      <td>{listItem.password}</td>
      <td>
        <button className={styles.buttonDelete} onClick={onDeleteIconClick}>
          X
        </button>
      </td>
    </tr>
  );
};

export default ListItem;

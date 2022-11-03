import styles from './ListItem.module.css';
import React from 'react';

const ListItem = ({ listItem, setShowModal, setSelectedId }) => {
  const onClickRedirect = () => {
    window.location.assign(`/super-admins/form?id=${listItem._id}`);
  };

  const onDeleteIconClick = (event) => {
    event.stopPropagation();
    setShowModal(true);
    setSelectedId(listItem._id);
  };
  return (
    <tr onClick={onClickRedirect}>
      <td>{listItem.name}</td>
      <td>{listItem.last_name}</td>
      <td>{listItem.email}</td>
      <td>{listItem.password}</td>
      <td>
        <div className={styles.buttonX}>
          <button className={styles.buttonDelete} onClick={onDeleteIconClick}>
            X
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ListItem;

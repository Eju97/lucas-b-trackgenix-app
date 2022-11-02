import styles from './ListItem.module.css';
import React from 'react';

const ListItem = ({ listItem, setShowModal, setSelectedId }) => {
  const onClickRedirect = () => {
    window.location.assign(`/super-admins/form?id=${listItem._id}`);
  };

  const onDeleteIconClick = () => {
    setShowModal(true);
    setSelectedId(listItem._id);
  };
  return (
    <tr>
      <td onClick={onClickRedirect}>{listItem.name}</td>
      <td onClick={onClickRedirect}>{listItem.last_name}</td>
      <td onClick={onClickRedirect}>{listItem.email}</td>
      <td onClick={onClickRedirect}>{listItem.password}</td>
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

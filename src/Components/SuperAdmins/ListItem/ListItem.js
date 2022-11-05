import styles from './ListItem.module.css';
import React from 'react';
import { useHistory } from 'react-router-dom';

const ListItem = ({ listItem, setShowModal, setSelectedId }) => {
  const history = useHistory();
  const onClickRedirect = () => {
    history.push(`/super-admins/form/${listItem._id}`);
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

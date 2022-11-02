import styles from './ListItem.module.css';

const ListItem = ({ listItem }) => {
  return (
    <tr
      className={styles.row}
      onClick={() => {
        window.location.assign(`/super-admins/form?id=${listItem._id}`);
      }}
    >
      <td>{listItem.name}</td>
      <td>{listItem.last_name}</td>
      <td>{listItem.email}</td>
      <td>{listItem.password}</td>
      <td>
        <button>X</button>
      </td>
    </tr>
  );
};

export default ListItem;

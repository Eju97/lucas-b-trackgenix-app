const ListItem = ({ listItem }) => {
  return (
    <tr>
      <td>{listItem.name}</td>
      <td>{listItem.last_name}</td>
      <td>{listItem.email}</td>
      <td>{listItem.password}</td>
      <td>
        <button>X</button>
        <button>E</button>
      </td>
    </tr>
  );
};

export default ListItem;

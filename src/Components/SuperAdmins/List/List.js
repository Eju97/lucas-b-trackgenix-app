import React from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './List.module.css';
import { useHistory } from 'react-router-dom';

const List = (props) => {
  const history = useHistory();
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th id="name">Name</th>
            <th id="lastName">Last name</th>
            <th id="Email">Email</th>
            <th id="Password">Password</th>
          </tr>
        </thead>
        <tbody>
          {props.superAdminList.map((item, i) => (
            <ListItem
              key={i}
              listItem={item}
              showModal={props.showModal}
              setShowModal={props.setShowModal}
              deleteId={props.setSelectedId}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.buttonCreate}
          onClick={() => history.push('/super-admins/form')}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default List;

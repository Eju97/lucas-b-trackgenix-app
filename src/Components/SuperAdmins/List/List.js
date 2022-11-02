import React from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './List.module.css';

const List = (props) => {
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
          {props.SuperAdminsList.map((item, i) => (
            <ListItem
              key={i}
              listItem={item}
              showModal={props.showModal}
              setShowModal={props.setShowModal}
              setSelectedId={props.setSelectedId}
            />
          ))}
        </tbody>
      </table>
      <div className={styles.container}>
        <button
          className={styles.buttonCreate}
          onClick={() => {
            window.location.assign(`/super-admins/form`);
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default List;

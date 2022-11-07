import React from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './List.module.css';
import Button from '../../Shared/Button';

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
          {props.superAdminList.map((item, i) => (
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
        <Button
          action={() => {
            window.location.assign(`/super-admins/form`);
          }}
          variant="confirm"
          name="Create"
        />
      </div>
    </div>
  );
};

export default List;

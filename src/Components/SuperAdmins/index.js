/* import styles from './super-admins.module.css'; */
import List from './List/List';
import React, { useEffect, useState } from 'react';

const SuperAdmins = (/* props */) => {
  const [SuperAdminsList, setSuperAdminsList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/super-admins/`)
      .then((res) => res.json())
      .then((data) => {
        setSuperAdminsList(data.data);
      });
  }, []);

  return (
    <div>
      <List SuperAdminsList={SuperAdminsList} setSuperAdminsList={setSuperAdminsList} />
    </div>
  );
};

export default SuperAdmins;

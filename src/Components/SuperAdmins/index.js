import List from './List/List';
import React, { useEffect, useState } from 'react';

const SuperAdmins = () => {
  const [SuperAdminsList, setSuperAdminsList] = useState([]);
  console.log(`${process.env.REACT_APP_API_URL}`);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/`)
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

/* import styles from './super-admins.module.css'; */
import List from './List/List';
import React, { useEffect, useState } from 'react';
/* import EditSuperAdmin from './Edit/Edit';
 */
const SuperAdmins = () => {
  const [SuperAdminsList, setSuperAdminsList] = useState([]);
  /* const [editSuperAdmin, superAdminToEdit] = useState({}); */

  useEffect(() => {
    fetch(`http://localhost:3000/super-admins/`)
      .then((res) => res.json())
      .then((data) => {
        setSuperAdminsList(data.data);
      });
  }, []);

  /* onst EditSuperAdmin = (input) => {
    try{
      fetch(`http://localhost:3000/super-admins/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(input)
      });
    }catch{

    }
  } */

  return (
    <div>
      <List SuperAdminsList={SuperAdminsList} setSuperAdminsList={setSuperAdminsList} />
      {/* <EditSuperAdmin EditSuperAdmin={editSuperAdmin} superAdminToEdit={superAdminToEdit} /> */}
    </div>
  );
};

export default SuperAdmins;

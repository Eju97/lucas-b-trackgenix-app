import { useState } from 'react';

const EditSuperAdmin = ({ superAdmin }) => {
  const [superAdminToEdit, changeSuperAdminEdited] = useState({
    name: superAdmin.name,
    last_name: superAdmin.last_name,
    email: superAdmin.email,
    password: superAdmin.password
  });

  const Edit = () => {
    try {
      let request = fetch(`http://localhost:3000/super-admins/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...superAdminToEdit })
      });
      const response = request.json();
      alert(response);
    } catch {
      alert(Error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={superAdminToEdit.name}
        onChange={(e) => changeSuperAdminEdited({ ...superAdminToEdit, name: e.target.value })}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          Edit(superAdmin._id);
        }}
        type="submit"
      >
        X
      </button>
    </div>
  );
};
export default EditSuperAdmin;

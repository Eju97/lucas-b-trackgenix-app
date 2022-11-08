import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import Modal from './ModalProject/Modal.js';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';

const Projects = () => {
  const history = useHistory();
  const [projects, saveProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);

  const deleteTask = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      saveProjects(projects.filter((project) => project._id !== id));
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onConfirmModal = () => {
    deleteTask(project);
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal show={showModal} closeModal={closeModal} onConfirmModal={onConfirmModal} />
      <h2>Projects</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Client Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            return (
              <tr key={project._id} onClick={() => history.push(`/projects/form/${project._id}`)}>
                <td>{project.name}</td>
                <td>{project.clientName}</td>
                <td>{project.description}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <div>
                  <tr>
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Role</th>
                  </tr>
                </div>
                {project.employees.map((employee) => {
                  return (
                    <tr key={employee._id}>
                      <td>
                        {!employee.employee ? 'There is no employee' : employee.employee.name}
                      </td>
                      <td>{employee.rate}</td>
                      <td>{employee.role}</td>
                    </tr>
                  );
                })}
                <td>
                  <img
                    src="../assets/images/remove.svg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowModal(true);
                      setProject(project._id);
                    }}
                  ></img>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Button onClick={() => history.push('/projects/form')} variant="confirm" name="Create" />
      </div>
    </section>
  );
};

export default Projects;

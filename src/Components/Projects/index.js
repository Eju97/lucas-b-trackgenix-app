import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import Modal from '../Shared/Modal';
import Table from '../Shared/Table/';
import Button from '../Shared/Button';

const Projects = () => {
  const urlForm = '/projects/form/';
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

  const deleteProject = async (id) => {
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
    deleteProject(project);
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal isOpen={showModal} handleClose={closeModal}>
        <div>
          <h3>Do you really want to delete this Project?</h3>
        </div>
        <div>
          <Button onClick={closeModal} variant="cancel" name="Cancel" />
          <Button onClick={onConfirmModal} variant="confirm" name="Accept" />
        </div>
      </Modal>
      <h2>Projects</h2>
      <Table
        data={projects}
        headers={['name', 'clientName', 'description', 'startDate', 'endDate']}
        showModal={setShowModal}
        urlForm={urlForm}
        deleteId={setProject}
      />
    </section>
  );
};

export default Projects;

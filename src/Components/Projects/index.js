import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import { Modal, Table, Button, Spinner } from 'Components/Shared/index';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProject, getProjects } from '../../redux/projects/thunks';

const Projects = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState();
  const { list: projectList, isLoading, error } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const dateFormatted = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const projectsData = () => {
    return projectList.map((project) => {
      return {
        ...project,
        startDate: dateFormatted(project.startDate),
        endDate: dateFormatted(project.endDate)
      };
    });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const onDelete = (_id) => {
    setProject(_id);
    setShowModal(true);
  };

  const onRowClick = (_id) => {
    history.push(`projects/form/${_id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onConfirmModal = () => {
    dispatch(deleteProject(project));
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
        data={projectsData()}
        headers={['name', 'clientName', 'description', 'startDate', 'endDate']}
        onDelete={onDelete}
        onRowClick={onRowClick}
      />
      <div className={styles.containerButton}>
        <Button
          type="submit"
          variant="confirm"
          name="Create +"
          onClick={() => history.push(`projects/form`)}
        />
      </div>
    </section>
  );
};

export default Projects;

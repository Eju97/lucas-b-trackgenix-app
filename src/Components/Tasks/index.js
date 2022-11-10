import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Modal from '../Shared/Modal';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';

function Tasks() {
  const history = useHistory();
  const [tasks, setTask] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        setTask(response.data);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const onDeleteTask = () => {
    handleDelete(selectedId);
    setShowModal(false);
  };
  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    setTask([...tasks.filter((newListItem) => newListItem._id !== id)]);
  };

  const onDelete = (_id, modalDisplay) => {
    setSelectedId(_id);
    setShowModal(modalDisplay);
  };

  const onRowClick = (_id) => {
    history.push(`/tasks/form/${_id}`);
  };

  return (
    <div className={styles.container}>
      <div>
        <Table data={tasks} headers={['description']} onDelete={onDelete} onRowClick={onRowClick} />
        <div className={styles.containerButton}>
          <button
            className={styles.buttonAdd}
            type="button"
            onClick={() => history.push('/tasks/form')}
          >
            Create
          </button>
        </div>
      </div>
      <Modal handleClose={closeModal} isOpen={showModal}>
        <div>
          <h3>Do you really want to delete this Task?</h3>
        </div>
        <div>
          <Button onClick={closeModal} variant="cancel" name="Cancel" />
          <Button onClick={onDeleteTask} variant="confirm" name="Accept" />
        </div>
      </Modal>
    </div>
  );
}

export default Tasks;

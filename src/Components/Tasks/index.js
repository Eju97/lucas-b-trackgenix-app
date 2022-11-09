import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import styles from './tasks.module.css';
import Modal from '../Shared/Modal';
import { useHistory } from 'react-router-dom';
import Button from '../Shared/Button';

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

  return (
    <div className={styles.container}>
      <TaskList list={tasks} setShowModal={setShowModal} setSelectedId={setSelectedId} />
      <Modal handleClose={closeModal} isOpen={showModal}>
        <div>
          <h3>Do you really want to delete this Task?</h3>
        </div>
        <div>
          <Button onClick={closeModal} variant="cancel" name="Cancel" />
          <Button onClick={onDeleteTask} variant="confirm" name="Accept" />
        </div>
      </Modal>
      <img
        onClick={() => history.push('/tasks/form')}
        src="../assets/images/add.svg"
        className={styles.addImg}
      ></img>
    </div>
  );
}

export default Tasks;

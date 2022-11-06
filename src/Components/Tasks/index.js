import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import styles from './tasks.module.css';
import Modal from '../Shared/Modal';

function Tasks() {
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
          <h3>Delete Task</h3>
        </div>
        <div>
          <p>Are you sure you want to delete task?</p>
        </div>
        <div>
          <button onClick={closeModal}>Close</button>
          <button onClick={onDeleteTask}>Delete</button>
        </div>
      </Modal>
      ;
      <a href="/tasks/form">
        <img src="../assets/images/add.svg" className={styles.addImg}></img>
      </a>
    </div>
  );
}

export default Tasks;

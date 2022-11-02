import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import styles from './tasks.module.css';
import Modal from './Modal';

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
      <Modal closeModal={closeModal} showModal={showModal} handleDelete={onDeleteTask} />
      <a href="/tasks/form">Add Task</a>
    </div>
  );
}

export default Tasks;

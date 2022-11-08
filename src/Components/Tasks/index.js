import { useEffect, useState } from 'react';
// import TaskList from './TaskList';
import styles from './tasks.module.css';
import Modal from './Modal';
// import { useHistory } from 'react-router-dom';
import Table from '../Shared/Table';

function Tasks() {
  // const history = useHistory();
  const urlForm = '/tasks/form/';
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
      <Table
        data={tasks}
        headers={['description']}
        onDeleteTask={onDeleteTask}
        urlForm={urlForm}
        showModal={setShowModal}
        deleteId={setSelectedId}
      />
      {/* <TaskList list={tasks} setShowModal={setShowModal} setSelectedId={setSelectedId} /> */}
      <Modal closeModal={closeModal} showModal={showModal} handleDelete={onDeleteTask} />
      {/* <img
        onClick={() => history.push('/tasks/form')}
        src="../assets/images/add.svg"
        className={styles.addImg}
      ></img> */}
    </div>
  );
}

export default Tasks;

import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Modal from '../Shared/Modal';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTask, deleteTask } from '../../redux/tasks/thunks';

function Tasks() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const { list: taskList, isLoading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTask());
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error} can not carge taks</h2>;
  }

  const onDeleteTask = () => {
    dispatch(deleteTask(selectedId));
    setShowModal(false);
  };

  const onDelete = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const onRowClick = (_id) => {
    history.push(`/tasks/form/${_id}`);
  };

  return (
    <div className={styles.container}>
      <div>
        <Table
          data={taskList}
          headers={['description']}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
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

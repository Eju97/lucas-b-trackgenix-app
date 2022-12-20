import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import { Modal, Table, Button, Spinner } from 'Components/Shared/index';
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
    return <Spinner></Spinner>;
  }

  if (error) {
    return <h2>{error} Cant show task</h2>;
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
    history.push(`tasks/form/${_id}`);
  };

  return (
    <div className={styles.container}>
      <h2>Tasks</h2>
      <div>
        <Table
          data={taskList}
          headers={['description']}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
        <div className={styles.containerButton}>
          <Button
            type="submit"
            variant="confirm"
            name="Create +"
            onClick={() => history.push(`tasks/form`)}
          />
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

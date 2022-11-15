import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input/Input';
import Button from '../../Shared/Button';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createTask, updateTask, getTask } from '../../../redux/tasks/thunks';
import { CREATE_TASK_SUCCESS, UPDATE_TASK_SUCCESS } from '../../../redux/tasks/constants';

const TaskForm = () => {
  const history = useHistory();
  const params = useParams();
  const [task, setTask] = useState({
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading } = useSelector((state) => state.tasks);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();

  const currentTask = useSelector((state) =>
    state.tasks.list.find((task) => task._id === params.id)
  );
  useEffect(() => {
    dispatch(getTask());
  }, []);
  useEffect(async () => {
    const id = params.id;
    if (id && currentTask) {
      setIsEditing(true);
      setTask({ description: currentTask.description });
    }
  }, [currentTask]);

  const onSubmit = async () => {
    if (!isEditing) {
      const response = await dispatch(createTask(task));
      if (response.type === CREATE_TASK_SUCCESS) {
        history.push('/tasks');
      }
    } else {
      const id = params.id;
      const response = await dispatch(updateTask(id, task));
      if (response.type === UPDATE_TASK_SUCCESS) {
        history.push('/tasks');
      }
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.container}>
      <div>{error && <h3>{error}</h3>}</div>
      <div>
        <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
      </div>
      <form>
        <div className={styles.form}>
          <Input
            label="Description"
            value={task.description}
            type="text"
            onChange={(a) => {
              setTask({
                description: a.target.value
              });
            }}
          />
        </div>
        <div className={styles.input}>
          <Button onClick={onSubmit} variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

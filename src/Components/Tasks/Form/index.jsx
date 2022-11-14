import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input/Input';
import Button from '../../Shared/Button';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createTask } from '../../../redux/tasks/thunks';

const TaskForm = () => {
  const history = useHistory();
  const params = useParams();
  const [task, setTask] = useState({
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  useEffect(async () => {
    const id = params.id;
    if (id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'GET'
      });
      const data = await response.json();
      setIsEditing(true);
      setTask({ description: data.data.description });
    }
  }, []);

  const onSubmit = async () => {
    if (!isEditing) {
      dispatch(createTask(task));
      history.push('/tasks');
    } else {
      await editTask();
    }
  };

  const editTask = async () => {
    try {
      const id = params.id;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      if (!data.error) {
        history.push('/tasks');
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
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

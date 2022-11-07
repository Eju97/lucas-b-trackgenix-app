import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Buttons from '../../Shared/Button';

const TaskForm = () => {
  const [task, setTask] = useState({
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
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
      await createTask();
    } else {
      await editTask();
    }
  };

  const editTask = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      if (!data.error) {
        window.location.assign('/tasks');
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createTask = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      if (!data.error) {
        window.location.assign('/tasks');
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
          <label>Description</label>
          <input
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
          {/* <input
            type="button"
            value="Submit"
            className={styles.submitBtn}
            onClick={() => {
              onSubmit();
            }}
          /> */}
          <Buttons action={onSubmit} variant="confirm" name="Submit" />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

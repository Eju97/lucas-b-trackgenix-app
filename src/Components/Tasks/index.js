import { useEffect, useState } from 'react';
import FormTask from './FormTask';
import styles from './tasks.module.css';

function Tasks() {
  const [tasks, setTask] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setTask(response.data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    setTask([...tasks.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <div className={styles.container}>
      <FormTask list={tasks} setTask={setTask} handleDelete={handleDelete} />
    </div>
  );
}

export default Tasks;

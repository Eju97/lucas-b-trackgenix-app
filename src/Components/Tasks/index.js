import { useEffect, useState } from 'react';
import FormTask from './FormTask';

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

  const deleteTask = (id) => {
    setTask([...tasks.filter((newListItem) => newListItem._id !== id)]);
  };

  return (
    <div>
      <FormTask list={tasks} setTask={setTask} deleteTask={deleteTask} />
    </div>
  );
}

export default Tasks;

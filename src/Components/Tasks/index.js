import styles from './tasks.module.css';
import { useEffect, useState } from 'react';

function Tasks() {
  const [tasks, setTask] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}tasks`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setTask(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <table>
        <tr>
          <th>Tasks</th>
          <th>Description</th>
        </tr>
        <div>
          {tasks.map((task) => {
            return (
              <tr key={task._id}>
                <td>{task.description}</td>
              </tr>
            );
          })}
        </div>
      </table>
    </section>
  );
}

export default Tasks;

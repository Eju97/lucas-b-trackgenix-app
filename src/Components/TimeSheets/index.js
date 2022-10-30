import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';

function TimeSheets() {
  const [timesheets, saveTimesheet] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        saveTimesheet(response.data);
      });
  }, []);
  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
      <table>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Hours</th>
          <th>Tasks</th>
          <th>Project</th>
          <th>Employee</th>
          <th>Task</th>
        </tr>
        {timesheets.map((timesheet) => {
          return (
            <tr key={timesheet._id}>
              <td>{timesheet.description}</td>
              <td>{timesheet.date}</td>
              <td>{timesheet.hours}</td>
              <td>{timesheet.tasks}</td>
              <td>{timesheet.project.name}</td>
              <td>{timesheet.employee.name}</td>
              <td>{timesheet.task.description}</td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}

export default TimeSheets;

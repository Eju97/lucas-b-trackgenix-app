import { useState } from 'react';
import styles from './form.module.css';

const Form = () => {
  const [timesheetAdded, setTimesheetAdded] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    project: '',
    employee: ''
  });
  console.log(timesheetAdded);
  const onChange = (event) => {
    setTimesheetAdded({ ...timesheetAdded, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: timesheetAdded.description,
        date: timesheetAdded.date,
        hours: timesheetAdded.hours,
        project: timesheetAdded.project,
        employee: timesheetAdded.employee,
        task: timesheetAdded.task
      })
    });
    const data = await response.json();
    if (!data.error) {
      window.location.assign('/time-sheets');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        <h2>Create a Timesheet</h2>
        <div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              type="text"
              required
              value={timesheetAdded.description}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              name="date"
              type="date"
              required
              value={timesheetAdded.date}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="hours">Hours</label>
            <input
              name="hours"
              type="number"
              required
              value={timesheetAdded.hours}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="project">Project</label>
            <input
              name="project"
              type="text"
              required
              value={timesheetAdded.project}
              onChange={onChange}
            ></input>
          </div>
          <div>
            <label htmlFor="employee">Employee</label>
            <input
              name="employee"
              type="select"
              required
              value={timesheetAdded.employee}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="task">Task</label>
            <input
              name="task"
              type="text"
              required
              value={timesheetAdded.value}
              onChange={onChange}
            />
          </div>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Form;

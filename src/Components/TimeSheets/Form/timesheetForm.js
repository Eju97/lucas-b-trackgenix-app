import { useEffect, useState } from 'react';
import styles from './form.module.css';

const Form = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formPut, setFormPut] = useState(true);
  const [errorState, setErrorState] = useState();
  const [timesheetAdded, setTimesheetAdded] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    project: '',
    employee: ''
  });

  const formDate = (date) => {
    const dateIso = date.substr(0, 10);
    return dateIso;
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((res) => res.json())
      .then((response) => {
        setProjects(response.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((res) => res.json())
      .then((response) => {
        setTasks(response.data);
      });
  }, []);

  useEffect(async () => {
    const urlForm = new URLSearchParams(window.location.search);
    const id = urlForm.get('id');
    if (id) {
      setFormPut(false);
      const urlFetch = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'GET'
      });
      const response = await urlFetch.json();

      setTimesheetAdded({
        description: response.data.description,
        date: response.data.date,
        hours: response.data.hours,
        project: response.data.project._id,
        employee: response.data.employee._id,
        task: response.data.task._id
      });
    } else {
      return null;
    }
  }, []);

  const onChange = (event) => {
    setTimesheetAdded({ ...timesheetAdded, [event.target.name]: event.target.value });
    if (event.target.name === 'project') {
      const selectedProject = projects.find((project) => project._id === event.target.value);
      const projectEmployees = selectedProject.employees.map((employee) => employee.employee);
      setEmployees(projectEmployees);
    }
  };

  const onSubmit = async (event) => {
    if (formPut) {
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
      } else {
        setErrorState(data.message);
      }
    } else {
      const urlForm = new URLSearchParams(window.location.search);
      const id = urlForm.get('id');
      event.preventDefault();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'PUT',
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
      } else {
        setErrorState(data.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        {formPut ? <h2>Create a Timesheet</h2> : <h2>Edit a Timesheet</h2>}
        <h3>{errorState}</h3>
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
              value={formDate(timesheetAdded.date)}
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
            <select name="project" required value={timesheetAdded.project} onChange={onChange}>
              <option value="" disabled hidden>
                Select a project
              </option>
              {projects.map((project) => {
                return (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="employee">Employee</label>
            <select name="employee" required value={timesheetAdded.employee} onChange={onChange}>
              <option value="" disabled hidden>
                Select an employee
              </option>
              {employees.map((employee) => {
                return (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="task">Task</label>
            <select name="task" required value={timesheetAdded.task} onChange={onChange}>
              <option value="" disabled hidden>
                Select a task
              </option>
              {tasks.map((task) => {
                return (
                  <option placeholder="hello" key={task._id} value={task._id}>
                    {task.description}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button type="submit">Add</button>
        <a href="'/time-sheets'">Go Back</a>
      </form>
    </div>
  );
};

export default Form;

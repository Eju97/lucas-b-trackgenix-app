import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import { useParams, useHistory } from 'react-router-dom';

const Form = () => {
  const params = useParams();
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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
    try {
      fetch(`${process.env.REACT_APP_API_URL}/projects`)
        .then((res) => res.json())
        .then((response) => {
          setProjects(response.data);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/tasks`)
        .then((res) => res.json())
        .then((response) => {
          setTasks(response.data);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(async () => {
    const id = params.id;
    if (id) {
      setIsEditing(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'GET'
      });
      const data = await response.json();

      setTimesheetAdded({
        description: data.data.description,
        date: data.data.date,
        hours: data.data.hours,
        project: !data.data.project ? '' : data.data.project._id,
        employee: !data.data.employee ? '' : data.data.employee._id,
        task: !data.data.task ? '' : data.data.task._id
      });
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
    if (!isEditing) {
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
        history.push('/time-sheets');
      } else {
        setErrorState(data.message);
      }
    } else {
      const id = params.id;
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
        history.push('/time-sheets');
      } else {
        setErrorState(data.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        {!isEditing ? <h2>Create a Timesheet</h2> : <h2>Edit a Timesheet</h2>}
        {errorState && <h3>{errorState}</h3>}
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
        <div>
          <Button onClick={onSubmit} variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default Form;

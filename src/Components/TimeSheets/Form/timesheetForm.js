import { useEffect, useState } from 'react';
import styles from './form.module.css';

const Form = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [timesheetAdded, setTimesheetAdded] = useState({
    description: '',
    date: '',
    hours: '',
    task: '',
    project: '',
    employee: ''
  });
  //  const tasksUrl = `process.env.REAC_APP_API_URL/tasks`;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((res) => res.json())
      .then((response) => {
        setProjects(response.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((res) => res.json())
      .then((response) => {
        setEmployees(response.data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((res) => res.json())
      .then((response) => {
        setTasks(response.data);
      });
  }, []);
  //console.log(projects);
  //console.log(projects[0].employees[0].employee.name);
  //useEffect(() => {
  //  fetch(tasksUrl)
  //    .then((res) => res.json())
  //    .then((response) => {
  //      setTasks(response.data);
  //    });
  //}, []);

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

  //  const projectMap = projects.map((project) => {
  //    project.employees.map((item) => {
  //      if (item === project.employees) {
  //        item.forEach((prop) => {
  //          return prop;
  //        });
  //      }
  //    });
  //  });
  //  console.log(projectMap);

  //   const employeesMap = projectMap.map((employees) => {
  // return employees;
  //   });
  //   console.log(employeesMap);

  //   const otroMap = employeesMap.map((item) => {
  // return item;
  //   });
  //   console.log(otroMap);
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
            <select name="project" required value={timesheetAdded.project} onChange={onChange}>
              <option value="" selected disabled hidden>
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
              <option value="" selected disabled hidden>
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
              <option value="" selected disabled hidden>
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
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Form;

import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input/Input';
import Button from '../../Shared/Button';
import { useParams, useHistory } from 'react-router-dom';
import { createTimesheet } from '../../../redux/timesheets/thunks';
import { getProjects } from '../../../redux/projects/thunks';
import { getTask } from '../../../redux/tasks/thunks';
import SelectInput from '../../Shared/Select';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.timesheets);
  const { list: tasks } = useSelector((state) => state.tasks);
  const { list: projects } = useSelector((state) => state.projects);
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

  useEffect(async () => {
    try {
      dispatch(getTask());
      dispatch(getProjects());
      const id = params.id;
      if (id) {
        setIsEditing(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
          method: 'GET'
        });
        const timeSheet = await response.json();
        const selectedProject = projects.data.find((project) => {
          if (timeSheet.data.project) {
            return project._id === timeSheet.data.project._id;
          }
          return false;
        });
        const projectEmployees = selectedProject
          ? selectedProject.employees.map((employee) => employee.employee)
          : [];
        setEmployees(projectEmployees);
        setTimesheetAdded({
          description: timeSheet.data.description,
          date: timeSheet.data.date,
          hours: timeSheet.data.hours,
          project: !timeSheet.data.project ? '' : timeSheet.data.project._id,
          employee: !timeSheet.data.employee ? '' : timeSheet.data.employee._id,
          task: !timeSheet.data.task ? '' : timeSheet.data.task._id
        });
      }
    } catch (error) {
      alert(error);
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
      dispatch(createTimesheet(timesheetAdded));
      history.push('/time-sheets');
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

  if (isLoading) {
    return <h3 className={styles.position}>Loading form...</h3>;
  }
  if (error) {
    return <h3 className={styles.position}>Error: Could not load Timesheet form</h3>;
  }
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        {!isEditing ? <h2>Create a Timesheet</h2> : <h2>Edit a Timesheet</h2>}
        {errorState && <h3>{errorState}</h3>}
        <div>
          <Input
            label="Description"
            name="description"
            type="text"
            required
            value={timesheetAdded.description}
            onChange={onChange}
          />
          <Input
            label="Date"
            name="date"
            type="date"
            required
            value={formDate(timesheetAdded.date)}
            onChange={onChange}
          />
          <Input
            label="Hours"
            name="hours"
            type="number"
            required
            value={timesheetAdded.hours}
            onChange={onChange}
          />
          <div>
            <SelectInput
              name="project"
              label="Projects"
              value={timesheetAdded.project._id}
              onChange={onChange}
              data={projects.map((project) =>
                !project
                  ? ''
                  : {
                      id: project._id,
                      value: project.name
                    }
              )}
            />
            <SelectInput
              name="employee"
              label="Employee"
              value={timesheetAdded.employee._id}
              onChange={onChange}
              data={employees.map((employee) =>
                !employee
                  ? ''
                  : {
                      id: employee._id,
                      value: employee.name
                    }
              )}
            />
          </div>
          <div>
            <SelectInput
              name="task"
              label="Task"
              value={timesheetAdded.task._id}
              onChange={onChange}
              data={tasks.map((task) =>
                !task
                  ? ''
                  : {
                      id: task._id,
                      value: task.description
                    }
              )}
            />
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

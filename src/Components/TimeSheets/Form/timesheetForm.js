import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { useParams, useHistory } from 'react-router-dom';
import {
  POST_TIMESHEETS_SUCCESS,
  PUT_TIMESHEET_SUCCESS
} from '../../../redux/timesheets/constants';
import { createTimesheet, editTimesheet, getTimesheets } from '../../../redux/timesheets/thunks';
import { getProjects } from '../../../redux/projects/thunks';
import { getTask } from '../../../redux/tasks/thunks';
import SelectInput from '../../Shared/Select';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading: isLoadingTimesheets, error } = useSelector((state) => state.timesheets);
  const { list: tasks, isLoading: isLoadingTasks } = useSelector((state) => state.tasks);
  const { list: projects, isLoading: isLoadingProjects } = useSelector((state) => state.projects);
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const currentTimesheet = useSelector((state) =>
    state.timesheets.list.find((timesheet) => timesheet._id === params.id)
  );
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
    dispatch(getTimesheets());
    dispatch(getTask());
    dispatch(getProjects());
  }, []);

  useEffect(async () => {
    try {
      const id = params.id;
      if (id && currentTimesheet) {
        setIsEditing(true);
        const selectedProject = projects.find((project) => {
          if (currentTimesheet.project) {
            return project._id === currentTimesheet.project._id;
          }
          return false;
        });
        const projectEmployees = selectedProject
          ? selectedProject.employees.map((employee) => employee.employee)
          : [];
        setEmployees(projectEmployees);
        setTimesheetAdded({
          description: currentTimesheet.description,
          date: currentTimesheet.date,
          hours: currentTimesheet.hours,
          project: !currentTimesheet.project ? '' : currentTimesheet.project._id,
          employee: !currentTimesheet.employee ? '' : currentTimesheet.employee._id,
          task: !currentTimesheet.task ? '' : currentTimesheet.task._id
        });
      }
    } catch (error) {
      alert(error);
    }
  }, [currentTimesheet]);

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
      const response = await dispatch(createTimesheet(timesheetAdded));
      if (response.type === POST_TIMESHEETS_SUCCESS) {
        history.push('/time-sheets');
      }
    } else {
      const id = params.id;
      event.preventDefault();
      const response = await dispatch(editTimesheet(id, timesheetAdded));
      if (response.type === PUT_TIMESHEET_SUCCESS) {
        history.push('/time-sheets');
      }
    }
  };

  if (isLoadingTimesheets || isLoadingTasks || isLoadingProjects) {
    return <h3 className={styles.position}>Loading form...</h3>;
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.container}>
        {!isEditing ? <h2>Create a Timesheet</h2> : <h2>Edit a Timesheet</h2>}
        {error && <h3>{error.message}</h3>}
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
              value={timesheetAdded.project}
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
              value={timesheetAdded.employee}
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
              value={timesheetAdded.task}
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

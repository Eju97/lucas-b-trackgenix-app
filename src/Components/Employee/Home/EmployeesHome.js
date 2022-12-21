import { useEffect } from 'react';
import Table from 'Components/Shared/Table';
import styles from './employ.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import { getTimesheets } from 'redux/timesheets/thunks';
import { getProjects } from 'redux/projects/thunks';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeHome = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const id = userData._id;
  const currentProjectPM = useSelector((state) =>
    state.projects.list.reduce((acc, project) => {
      const hasEmployee = project.employees.some(
        (employee) =>
          employee.length !== 0 &&
          employee.employee !== null &&
          employee.employee._id === id &&
          employee.role === 'PM'
      );
      if (hasEmployee) {
        return [...acc, project];
      }
      return acc;
    }, [])
  );
  const currentTimesheet = useSelector((state) =>
    state.timesheets.list.filter((timesheet) => timesheet?.employee?._id === id)
  );
  const currentTimesheetPM = useSelector((state) =>
    state.timesheets.list.filter(
      (timesheet) => timesheet?.project?._id === currentProjectPM[0]?._id
    )
  );

  useEffect(() => {
    dispatch(getTimesheets());
    dispatch(getProjects());
  }, []);

  const dateFormatted = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  console.log(currentProjectPM);
  const timeSheetData = () => {
    return currentTimesheet.map((timesheet) => {
      return {
        ...timesheet,
        date: dateFormatted(timesheet.date),
        task: !timesheet.task ? (
          <p className={styles.none}>There is no task</p>
        ) : (
          timesheet.task.description
        ),
        employee: !timesheet.employee ? (
          <p className={styles.none}>There is no employee</p>
        ) : (
          `${timesheet.employee.name} ${timesheet.employee.lastName}`
        ),
        project: !timesheet.project ? (
          <p className={styles.none}>There is no project</p>
        ) : (
          timesheet.project.name
        )
      };
    });
  };
  const timeSheetDataPM = () => {
    return currentTimesheetPM.map((timesheet) => {
      return {
        ...timesheet,
        date: dateFormatted(timesheet.date),
        task: !timesheet.task ? (
          <p className={styles.none}>There is no task</p>
        ) : (
          timesheet.task.description
        ),
        employee: !timesheet.employee ? (
          <p className={styles.none}>There is no employee</p>
        ) : (
          `${timesheet.employee.name} ${timesheet.employee.lastName}`
        ),
        project: !timesheet.project ? (
          <p className={styles.none}>There is no project</p>
        ) : (
          timesheet.project.name
        )
      };
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>My Timesheets</h2>
      </div>
      <div>
        <Table
          data={timeSheetData()}
          headers={['description', 'date', 'hours', 'project', 'employee', 'task']}
        />
      </div>
      <div>
        <h2>My Timesheets PM</h2>
      </div>
      <div>
        <Table
          data={timeSheetDataPM()}
          headers={['description', 'date', 'hours', 'project', 'employee', 'task']}
        />
      </div>
      <div>
        <Button
          onClick={() => history.push(`timesheets/newtimesheet/${id}`)}
          variant="confirm"
          name="Create timesheet"
        />
      </div>
    </div>
  );
};

export default EmployeeHome;

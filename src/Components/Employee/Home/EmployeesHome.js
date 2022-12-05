import { useEffect } from 'react';
import Table from 'Components/Shared/Table';
import styles from './employ.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import { getTimesheets } from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeHome = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = '637aef7b511be17cb78c67b9';
  const currentTimesheet = useSelector((state) =>
    state.timesheets.list.filter((timesheet) => timesheet?.employee?._id === id)
  );

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  const dateFormatted = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

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
        <Button
          onClick={() => history.push(`/employee/home/newtimesheet/${id}`)}
          variant="confirm"
          name="Create timesheet"
        />
      </div>
    </div>
  );
};

export default EmployeeHome;

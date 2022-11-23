import { useEffect, useState } from 'react';
import Table from 'Components/Shared/Table';
import styles from './employ.module.css';
import Button from 'Components/Shared/Button';
import TimesheetsHours from './timesheet';
import { useHistory } from 'react-router-dom';
import { getProjects } from 'redux/projects/thunks';
import { getTimesheets } from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeHome = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState('projects');
  const [hours, setHours] = useState(null);
  const dispatch = useDispatch();
  const id = '637aef7b511be17cb78c67b9';
  const currentTimesheet = useSelector((state) =>
    state.timesheets.list.filter((timesheet) => timesheet.employee?._id === id)
  );
  const currentProject = useSelector((state) =>
    state.projects.list.filter(
      (project) =>
        project.employees.length !== 0 &&
        project.employees[0].employee !== null &&
        project.employees[0].employee._id === id
    )
  );

  useEffect(() => {
    dispatch(getTimesheets());
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    getHours();
  }, [currentTimesheet]);

  const timesheetsHours = () => {
    return (
      <TimesheetsHours
        data={timeSheetData()}
        headers={['description', 'project', 'task', 'hours']}
        hours={hours}
      />
    );
  };

  const dateFormatted = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const getHours = () => {
    const hoursList = [];
    currentTimesheet.map((timesheet) => hoursList.push(timesheet.hours));
    const totalHours = hoursList.length !== 0 && hoursList.reduce((v1, v2) => v1 + v2);
    setHours(totalHours);
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

  const projectsData = () => {
    return currentProject.map((project) => {
      return {
        ...project,
        startDate: dateFormatted(project.startDate),
        endDate: dateFormatted(project.endDate)
      };
    });
  };

  return (
    <div className={styles.container}>
      {!visible && (
        <div className={styles.buttonsBox}>
          <div
            onClick={() => {
              setSelected('projects');
            }}
            className={
              selected === 'projects' ? styles.projectsButtonSelected : styles.projectsButton
            }
          >
            My Projects
          </div>
          <div
            onClick={() => {
              setSelected('timesheets');
            }}
            className={
              selected === 'timesheets' ? styles.timesheetsButtonSelected : styles.timesheetsButton
            }
          >
            My Timesheets
          </div>
        </div>
      )}
      {visible ? (
        timesheetsHours()
      ) : selected === 'projects' ? (
        <Table
          data={projectsData()}
          headers={['name', 'clientName', 'description', 'startDate', 'endDate']}
        />
      ) : (
        <div>
          <Table
            data={timeSheetData()}
            headers={['description', 'date', 'hours', 'project', 'employee', 'task']}
          />
        </div>
      )}
      {selected !== 'projects' && (
        <Button
          onClick={() => {
            setVisible(!visible);
          }}
          variant="cancel"
          name={!visible ? 'Resumen horas' : 'Ocultar resumen'}
        />
      )}
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

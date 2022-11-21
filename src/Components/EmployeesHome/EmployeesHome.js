import React, { useEffect, useState } from 'react';
/* import { getProjectsById, getTimesheetsById } from '../../redux/employees/thunks'; */
import { getTimesheets } from '../../redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Table from '../Shared/Table';
import { getProjects } from '../../redux/projects/thunks';
import styles from './employ.module.css';

const EmployeesHome = () => {
  const [selected, setSelected] = useState('projects');
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);
  const idTest = '637aef7b511be17cb78c67b9';
  const history = useHistory();
  console.log(history);

  const currentTimesheet = useSelector((state) =>
    state.timesheets.list.filter((timesheet) => timesheet.employee?._id === idTest)
  );

  const currentProject = useSelector((state) =>
    state.projects.list.filter(
      (project) =>
        project.employees.length !== 0 &&
        project.employees[0].employee !== null &&
        project.employees[0].employee._id === idTest
    )
  );

  console.log('current timesheet', currentTimesheet);
  console.log('current project', currentProject);

  useEffect(() => {
    dispatch(getTimesheets());
    dispatch(getProjects());
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
    <>
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
      {selected === 'projects' ? (
        <Table
          data={projectsData()}
          headers={['name', 'clientName', 'description', 'startDate', 'endDate']}
        />
      ) : (
        <Table
          data={timeSheetData()}
          headers={['description', 'date', 'hours', 'project', 'employee', 'task']}
        />
      )}
    </>
  );
};

export default EmployeesHome;

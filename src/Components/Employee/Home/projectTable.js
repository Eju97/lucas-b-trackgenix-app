import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { useEffect } from 'react';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import styles from './employ.module.css';

const ProjectTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = '637aef7b511be17cb78c67b9';
  const currentProject = useSelector((state) =>
    state.projects.list.reduce((acc, project) => {
      const hasEmployee = project.employees.some(
        (employee) =>
          employee.length !== 0 && employee.employee !== null && employee.employee._id === id
      );
      if (hasEmployee) {
        return [...acc, project];
      }
      return acc;
    }, [])
  );

  const projectsData = () => {
    return currentProject.map((project) => {
      return {
        ...project,
        startDate: dateFormatted(project.startDate),
        endDate: dateFormatted(project.endDate)
      };
    });
  };

  const dateFormatted = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <div className={styles.container}>
      <h2>My projects</h2>
      <Table
        data={projectsData()}
        headers={['name', 'clientName', 'description', 'startDate', 'endDate']}
      />
      <div>
        <Button
          onClick={() => history.push(`/employee/home/newtimesheet/${id}`)}
          variant="confirm"
          name="Create timesheet"
        />
        <Button
          onClick={() => history.push(`/employee/home/`)}
          variant="confirm"
          name="My timesheets"
        />
      </div>
    </div>
  );
};

export default ProjectTable;

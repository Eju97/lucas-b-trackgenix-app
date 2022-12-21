import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { useEffect } from 'react';
import Table from 'Components/Shared/Table';
import styles from './employ.module.css';
import { useHistory } from 'react-router-dom';

const ProjectTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.auth.user);
  const id = userData._id;
  const currentProject = useSelector((state) =>
    state.projects.list.reduce((acc, project) => {
      const hasEmployee = project.employees.some(
        (employee) =>
          employee.length !== 0 &&
          employee.employee !== null &&
          employee.employee._id === id &&
          employee.role !== 'PM'
      );
      if (hasEmployee) {
        return [...acc, project];
      }
      return acc;
    }, [])
  );

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

  const projectsData = () => {
    return currentProject.map((project) => {
      return {
        ...project,
        startDate: dateFormatted(project.startDate),
        endDate: dateFormatted(project.endDate)
      };
    });
  };

  const projectsDataPM = () => {
    return currentProjectPM.map((project) => {
      return {
        ...project,
        startDate: dateFormatted(project.startDate),
        endDate: dateFormatted(project.endDate)
      };
    });
  };

  const onRowClick = (id) => {
    history.push(`projects/form/${id}`);
  };

  const dateFormatted = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);
  console.log(currentProject);

  return (
    <div className={styles.container}>
      <h2>My projects</h2>
      <Table
        data={projectsData()}
        headers={['name', 'clientName', 'description', 'startDate', 'endDate']}
      />
      <h2>My projects as PM</h2>
      <Table
        data={projectsDataPM()}
        headers={['name', 'clientName', 'description', 'startDate', 'endDate']}
        onRowClick={onRowClick}
      />
    </div>
  );
};

export default ProjectTable;

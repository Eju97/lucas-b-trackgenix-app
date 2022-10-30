import { useEffect, useState } from 'react';
import styles from './projects.module.css';

function Projects() {
  const [projects, saveProjects] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Client Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            return (
              <tr key={project._id}>
                <td>{project.name}</td>
                <td>{project.clientName}</td>
                <td>{project.description}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <div>
                  <tr>
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Role</th>
                  </tr>
                </div>
                {project.employees.map((employee) => {
                  return (
                    <tr key={employee._id}>
                      <td>{employee.employee.name}</td>
                      <td>{employee.rate}</td>
                      <td>{employee.role}</td>
                    </tr>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Projects;

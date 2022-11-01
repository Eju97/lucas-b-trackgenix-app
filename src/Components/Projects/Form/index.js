import { useEffect, useState } from 'react';
import styles from './form.module.css';

const Form = () => {
  const [projectAdd, setProjectAdd] = useState({
    name: '',
    clientName: '',
    description: '',
    startDate: '',
    endDate: '',
    employees: []
  });

  const [employeeList, setEmployeeList] = useState([]);

  const [employeeProject, setEmployeeProject] = useState({
    rate: null,
    role: '',
    employee: ''
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployeeList(response.data);
      });
  }, []);

  const onSubmit = (event) => {
    console.log(projectAdd);
    event.preventDefault();
  };

  const deleteEmployees = (id) => {
    setProjectAdd({
      ...projectAdd,
      employees: projectAdd.employees.filter((employee) => employee.employee !== id)
    });
  };

  const createProjects = async (projectAdd) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectAdd)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <div className={styles.projectForm}>
          <div>
            <label>Name</label>
            <input
              className={styles.input}
              id="name"
              name="name"
              required
              onChange={(e) => {
                setProjectAdd({
                  ...projectAdd,
                  name: e.target.value
                });
              }}
            />
            <label>Client Name</label>
            <input
              className={styles.input}
              id="clientName"
              name="clientName"
              required
              onChange={(e) => {
                setProjectAdd({
                  ...projectAdd,
                  clientName: e.target.value
                });
              }}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              className={styles.input}
              id="description"
              name="description"
              required
              onChange={(e) => {
                setProjectAdd({
                  ...projectAdd,
                  description: e.target.value
                });
              }}
            />
          </div>
          <div>
            <label>Start Date</label>
            <input
              className={styles.input}
              id="startDate"
              name="startDate"
              type="date"
              required
              onChange={(e) => {
                let dateFormatted = new Date(e.target.value).toISOString();
                console.log(dateFormatted);
                setProjectAdd({
                  ...projectAdd,
                  startDate: dateFormatted
                });
              }}
            />
            <label>End Date</label>
            <input
              className={styles.input}
              id="endDate"
              name="endDate"
              type="date"
              required
              onChange={(e) => {
                let dateFormatted = new Date(e.target.value).toISOString();
                setProjectAdd({
                  ...projectAdd,
                  endDate: dateFormatted
                });
              }}
            />
          </div>
        </div>
        <h3>Employees</h3>
        <div className={styles.employeeForm}>
          <div>
            <label>Employees</label>
            <select
              name="role"
              id="role"
              onChange={(e) => {
                setEmployeeProject({
                  ...employeeProject,
                  employee: e.target.value
                });
              }}
            >
              {employeeList.map((employee) => {
                return (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Role</label>
            <select
              name="role"
              id="role"
              onChange={(e) => {
                setEmployeeProject({
                  ...employeeProject,
                  role: e.target.value
                });
              }}
            >
              <option value="DEV 1">DEV</option>
              <option value="TL">TL</option>
              <option value="PM">PM</option>
              <option value="QA">QA</option>
            </select>
          </div>
          <div>
            <label>Rate</label>
            <input
              name="rate"
              id="rate"
              onChange={(e) => {
                setEmployeeProject({
                  ...employeeProject,
                  rate: e.target.value
                });
              }}
            ></input>
          </div>
          <div>
            <button
              onClick={() => {
                setProjectAdd({
                  ...projectAdd,
                  employees: [...projectAdd.employees, employeeProject]
                });
              }}
            >
              Assign Employee
            </button>
          </div>
        </div>
        <div>
          {projectAdd.employees.map((employee) => {
            const currentEmployee = employeeList.find((item) => item._id === employee.employee);
            return (
              <tr key={employee.employee}>
                <td>{currentEmployee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.rate}</td>
                <button
                  onClick={() => {
                    deleteEmployees(employee.employee);
                  }}
                >
                  X
                </button>
              </tr>
            );
          })}
        </div>
        <div>
          <button
            type="submit"
            onClick={() => {
              createProjects(projectAdd);
            }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

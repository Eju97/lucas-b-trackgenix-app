import { useEffect, useState } from 'react';
import styles from './form.module.css';
import TextAndDateInput from '../../Shared/TextAndDateInput/TextAndDateInput';
import Button from '../../Shared/Button';
import { useHistory, useParams } from 'react-router-dom';

const Form = () => {
  const history = useHistory();
  const params = useParams();
  const [projectState, setProjectState] = useState({
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
  const [errorMessage, setErrorMessage] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/employees`)
        .then((response) => response.json())
        .then((response) => {
          setEmployeeList(response.data);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const formatDate = (date) => {
    const dateIso = date.substr(0, 10);
    return dateIso;
  };

  useEffect(async () => {
    const id = params.id;
    if (id) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
          method: 'GET'
        });
        const project = await response.json();
        const employeeList = project.data.employees.map((item) => {
          if (item.employee) {
            return {
              employee: item.employee._id,
              rate: item.rate,
              role: item.role
            };
          }
          return 'noEmployee';
        });
        const newEmployeeList = employeeList.filter((employee) => employee !== 'noEmployee');
        setProjectState({
          name: project.data.name,
          clientName: project.data.clientName,
          description: project.data.description,
          startDate: project.data.startDate,
          endDate: project.data.endDate,
          employees: newEmployeeList
        });
        setIsEditing(true);
      } catch (error) {
        alert(error);
      }
    }
  }, []);

  const deleteEmployees = (id) => {
    setProjectState({
      ...projectState,
      employees: projectState.employees.filter((employee) => employee.employee !== id)
    });
  };

  const onSubmit = async () => {
    if (!isEditing) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(projectState)
        });
        const data = await response.json();
        if (!data.error) {
          history.push('/projects');
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const id = params.id;
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(projectState)
        });
        const data = await response.json();
        if (!data.error) {
          history.push('/projects');
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>{errorMessage && <h3>{errorMessage}</h3>}</div>
      <form>
        <h2>Form</h2>
        <div className={styles.projectForm}>
          <div>
            <TextAndDateInput
              label="Name"
              id="name"
              name="name"
              value={projectState.name}
              onChange={(e) => {
                setProjectState({
                  ...projectState,
                  name: e.target.value
                });
              }}
            />
            <TextAndDateInput
              label="Client Name"
              id="clientName"
              name="clientName"
              value={projectState.clientName}
              onChange={(e) => {
                setProjectState({
                  ...projectState,
                  clientName: e.target.value
                });
              }}
            />
          </div>
          <div>
            <TextAndDateInput
              label="Description"
              id="description"
              name="description"
              value={projectState.description}
              onChange={(e) => {
                setProjectState({
                  ...projectState,
                  description: e.target.value
                });
              }}
            />
          </div>
          <div>
            <TextAndDateInput
              label="Start Date"
              id="startDate"
              name="startDate"
              type="date"
              value={formatDate(projectState.startDate)}
              onChange={(e) => {
                let dateFormatted = new Date(e.target.value).toISOString();
                setProjectState({
                  ...projectState,
                  startDate: dateFormatted
                });
              }}
            />
            <TextAndDateInput
              label="End Date"
              id="endDate"
              name="endDate"
              type="date"
              value={formatDate(projectState.endDate)}
              onChange={(e) => {
                let dateFormatted = new Date(e.target.value).toISOString();
                setProjectState({
                  ...projectState,
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
              required
              onChange={(e) => {
                setEmployeeProject({
                  ...employeeProject,
                  employee: e.target.value
                });
              }}
            >
              <option value="" disabled hidden selected>
                Select Employee
              </option>
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
              <option value="" disabled hidden selected>
                Select Rol
              </option>
              <option value="DEV">DEV</option>
              <option value="TL">TL</option>
              <option value="PM">PM</option>
              <option value="QA">QA</option>
            </select>
          </div>
          <div>
            <TextAndDateInput
              label="Rate"
              name="rate"
              id="rate"
              onChange={(e) => {
                setEmployeeProject({
                  ...employeeProject,
                  rate: e.target.value
                });
              }}
            />
          </div>
          <div>
            <Button
              action={() => {
                setProjectState({
                  ...projectState,
                  employees: [...projectState.employees, employeeProject]
                });
              }}
              variant="confirm"
              name="Assing Employee"
            />
          </div>
        </div>
        <div className={styles.employees}>
          {projectState.employees.map((employee) => {
            const currentEmployee = employeeList.find((item) => item._id === employee.employee);
            if (currentEmployee) {
              return (
                <tr key={employee.employee} className={styles.employeeList}>
                  <td>{currentEmployee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.rate}</td>
                  <td>
                    <button
                      onClick={() => {
                        deleteEmployees(employee.employee);
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </div>
        <div className={styles.save}>
          <Button onClick={onSubmit} variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default Form;

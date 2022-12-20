import { useEffect, useState } from 'react';
import styles from './form.module.css';
import { Input, Button, Select, Spinner } from 'Components/Shared/index';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, postProject, putProject } from '../../../redux/projects/thunks';
import { POST_PROJECTS_SUCCESS, PUT_PROJECTS_SUCCESS } from '../../../redux/projects/constants';
import { getEmployees } from '../../../redux/employees/thunks';
import { useForm, useFieldArray } from 'react-hook-form';
import { schema } from './validations.js';
import { joiResolver } from '@hookform/resolvers/joi';

const Form = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees'
  });

  const history = useHistory();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const error = useSelector((state) => state.projects.error);
  const employeeList = useSelector((state) => state.employees.list);
  const isLoadingEmployees = useSelector((state) => state.employees.isLoading);
  const isLoadingProjects = useSelector((state) => state.projects.isLoading);
  const dispatch = useDispatch();
  const currentProject = useSelector((state) =>
    state.projects.list.find((project) => project._id === params.id)
  );

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjects());
  }, []);

  const formatDate = (date) => {
    const dateIso = date.substr(0, 10);
    return dateIso;
  };

  useEffect(async () => {
    const id = params.id;
    if (id && currentProject) {
      try {
        const employeeList = currentProject.employees.map((item) => {
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
        reset({
          name: currentProject.name,
          clientName: currentProject.clientName,
          description: currentProject.description,
          startDate: formatDate(currentProject.startDate),
          endDate: formatDate(currentProject.endDate),
          employees: newEmployeeList
        });
        setIsEditing(true);
      } catch (error) {
        alert(error);
      }
    }
  }, [currentProject]);

  const onSubmit = async (data) => {
    if (!isEditing) {
      const response = await dispatch(postProject(data));
      if (response.type === POST_PROJECTS_SUCCESS) {
        history.goBack();
      }
    } else {
      const id = params.id;
      const response = await dispatch(putProject(id, data));
      if (response.type === PUT_PROJECTS_SUCCESS) {
        history.goBack();
      }
    }
  };

  if (isLoadingEmployees || isLoadingProjects) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={styles.container}>
      <div>{error && <h3>{error}</h3>}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsBox}>
          <h2>{isEditing ? 'Edit Project' : 'Create New Project'}</h2>
          <div className={styles.inputs}>
            <Input
              label="Name"
              id="name"
              required
              name="name"
              register={register}
              error={errors.name?.message}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              label="Client Name"
              id="clientName"
              required
              name="clientName"
              register={register}
              error={errors.clientName?.message}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              label="Description"
              id="description"
              required
              name="description"
              register={register}
              error={errors.description?.message}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              label="Start Date"
              id="startDate"
              name="startDate"
              register={register}
              error={errors.startDate?.message}
              type="date"
            />
          </div>
          <div className={styles.inputs}>
            <Input
              label="End Date"
              id="endDate"
              name="endDate"
              register={register}
              error={errors.endDate?.message}
              type="date"
            />
          </div>
          <div>
            <h3>Employees</h3>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className={styles.employeeForm}>
                  <div>
                    <section>
                      <label>
                        Role
                        <Select
                          name={`employees[${index}].role`}
                          label="Role"
                          register={register}
                          error={errors.employees?.message}
                          data={[
                            { id: 'DEV', value: 'DEV' },
                            { id: 'TL', value: 'TL' },
                            { id: 'PM', value: 'PM' },
                            { id: 'QA', value: 'QA' }
                          ]}
                        />
                      </label>
                      <label>
                        Employee
                        <Select
                          name={`employees[${index}].employee`}
                          label="Employee"
                          register={register}
                          error={errors.employees?.message}
                          data={employeeList.map((employee) =>
                            !employee
                              ? ''
                              : {
                                  id: employee._id,
                                  value: employee.name
                                }
                          )}
                        />
                      </label>
                      <label>
                        Rate
                        <Input
                          name={`employees[${index}].rate`}
                          id="rate"
                          required
                          register={register}
                          error={errors.employees?.message}
                        />
                      </label>
                    </section>
                  </div>
                  <div className={styles.buttonBox}>
                    <button
                      className={styles.removeBtn}
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <div className={styles.btnTxt}>Remove</div>
                    </button>
                  </div>
                </div>
              );
            })}
            <button
              className={styles.addBtn}
              type="button"
              onClick={() => {
                append({
                  employee: '',
                  role: 'QA',
                  rate: 0
                });
              }}
            >
              <div className={styles.addIcon}></div>
              <div className={styles.btnTxt}>Add</div>
            </button>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button type="submit" variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
          <Button onClick={() => reset()} variant="reset" name="Reset" />
        </div>
      </form>
    </div>
  );
};

export default Form;

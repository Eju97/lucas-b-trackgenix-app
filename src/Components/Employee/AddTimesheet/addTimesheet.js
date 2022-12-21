import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'Components/Shared/Button';
import { Input } from 'Components/Shared';
import Select from 'Components/Shared/Select';
import { getProjects } from 'redux/projects/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { POST_TIMESHEETS_SUCCESS } from 'redux/timesheets/constants';
import { createTimesheet } from 'redux/timesheets/thunks';
import { getTask } from 'redux/tasks/thunks';
import styles from './addtimesheet.module.css';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from './timesheetValidation';

const NewTimesheet = () => {
  const params = useParams();
  const id = params.id;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { employee: id },
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: tasks } = useSelector((state) => state.tasks);
  const taskList = tasks.filter((task) => !task.isDeleted);
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

  useEffect(() => {
    dispatch(getTask());
    dispatch(getProjects());
  }, []);

  const onSubmit = async (data) => {
    const response = await dispatch(createTimesheet(data));
    if (response.type === POST_TIMESHEETS_SUCCESS) {
      history.goBack();
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsBox}>
          <h2>Create Timesheets</h2>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Description"
              name="description"
              required
              type="text"
              error={errors.description?.message}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Date"
              name="date"
              type="date"
              error={errors.date?.message}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Hours"
              name="hours"
              type="number"
              required
              error={errors.hours?.message}
            />
          </div>
          <div>
            <Select
              error={errors.project?.message}
              register={register}
              name="project"
              label="Projects"
              data={currentProject.map((project) =>
                !project
                  ? ''
                  : {
                      id: project._id,
                      value: project.name
                    }
              )}
            />
          </div>
          <div>
            <Select
              error={errors.task?.message}
              register={register}
              name="task"
              label="Task"
              data={taskList.map((task) =>
                !task
                  ? ''
                  : {
                      id: task._id,
                      value: task.description
                    }
              )}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button type="submit" variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default NewTimesheet;

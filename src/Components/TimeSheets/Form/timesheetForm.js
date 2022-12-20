import { useEffect, useState } from 'react';
import styles from './form.module.css';
import { Spinner, Select, Button, Input } from 'Components/Shared';
import { useParams, useHistory } from 'react-router-dom';
import {
  POST_TIMESHEETS_SUCCESS,
  PUT_TIMESHEET_SUCCESS
} from '../../../redux/timesheets/constants';
import { createTimesheet, editTimesheet, getTimesheets } from '../../../redux/timesheets/thunks';
import { getProjects } from '../../../redux/projects/thunks';
import { getTask } from '../../../redux/tasks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { timesheetsSchema } from '../validations/validations';

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(timesheetsSchema)
  });

  const watchProject = watch('project');
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading: isLoadingTimesheets, error } = useSelector((state) => state.timesheets);
  const { list: tasks, isLoading: isLoadingTasks } = useSelector((state) => state.tasks);
  const { list: projects, isLoading: isLoadingProjects } = useSelector((state) => state.projects);
  const currentProject = projects.find((project) => project._id === watchProject);
  const [isEditing, setIsEditing] = useState(false);
  const currentTimesheet = useSelector((state) =>
    state.timesheets.list.find((timesheet) => timesheet._id === params.id)
  );

  useEffect(() => {
    dispatch(getTimesheets());
    dispatch(getTask());
    dispatch(getProjects());
  }, []);

  useEffect(async () => {
    try {
      const id = params.id;
      if (id && currentTimesheet) {
        setIsEditing(true);
        reset({
          description: currentTimesheet.description,
          date: currentTimesheet.date.substr(0, 10),
          hours: currentTimesheet.hours,
          project: !currentTimesheet.project ? '' : currentTimesheet.project._id,
          employee: !currentTimesheet.employee ? '' : currentTimesheet.employee._id,
          task: !currentTimesheet.task ? '' : currentTimesheet.task._id
        });
      }
    } catch (error) {
      alert(error);
    }
  }, [currentTimesheet]);

  const onSubmit = async (data) => {
    if (!isEditing) {
      const response = await dispatch(createTimesheet(data));
      if (response.type === POST_TIMESHEETS_SUCCESS) {
        history.goBack();
      }
    } else {
      const id = params.id;
      const response = await dispatch(editTimesheet(id, data));
      if (response.type === PUT_TIMESHEET_SUCCESS) {
        history.goBack();
      }
    }
  };

  if (isLoadingTimesheets || isLoadingTasks || isLoadingProjects) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsBox}>
          {!isEditing ? <h2>Create a Timesheet</h2> : <h2>Edit a Timesheet</h2>}
          {error && <h3>{error.message}</h3>}
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Description"
              error={errors.description?.message}
              name="description"
              type="text"
              required
            />
          </div>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Date"
              error={errors.date?.message}
              name="date"
              type="date"
            />
          </div>
          <div className={styles.inputs}>
            <Input
              register={register}
              label="Hours"
              error={errors.hours?.message}
              name="hours"
              type="number"
              required
            />
          </div>
          <div>
            <Select
              register={register}
              name="project"
              label="Projects"
              error={errors.project?.message}
              data={projects.map((project) =>
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
              register={register}
              name="employee"
              label="Employee"
              error={errors.employee?.message}
              data={
                currentProject?.employees
                  ? currentProject?.employees.map((employee) => {
                      return {
                        id: employee?.employee?._id,
                        value: employee?.employee?.name
                      };
                    })
                  : ['']
              }
            />
          </div>
          <div>
            <Select
              register={register}
              name="task"
              label="Task"
              error={errors.task?.message}
              data={tasks.map((task) =>
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
          <Button onClick={() => reset()} type="button" variant="reset" name="Reset" />
        </div>
      </form>
    </div>
  );
};

export default Form;

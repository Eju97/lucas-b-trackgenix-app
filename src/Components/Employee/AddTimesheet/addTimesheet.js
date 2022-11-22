import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Shared/Button';
import Input from '../../Shared/Input/Input';
import SelectInput from '../../Shared/Select';
import { getProjects } from '../../../redux/projects/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { POST_TIMESHEETS_SUCCESS } from '../../../redux/timesheets/constants';
import { createTimesheet } from '../../../redux/timesheets/thunks';
import { getTask } from '../../../redux/tasks/thunks';
import styles from './addtimesheet.module.css';

const NewTimesheet = () => {
  const params = useParams();
  const id = params.id;
  const { register, handleSubmit } = useForm({ defaultValues: { employee: id } });
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: tasks } = useSelector((state) => state.tasks);
  const currentProject = useSelector((state) =>
    state.projects.list.filter(
      (project) =>
        project.employees.length !== 0 &&
        project.employees[0].employee !== null &&
        project.employees[0].employee._id === id
    )
  );

  useEffect(() => {
    dispatch(getTask());
    dispatch(getProjects());
  }, []);

  const onSubmit = async (data, id) => {
    const response = await dispatch(createTimesheet(data));
    console.log(data, id);
    if (response.type === POST_TIMESHEETS_SUCCESS) {
      history.push('/employee/home');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div>
          <Input register={register} label="Description" name="description" type="text" required />
          <Input register={register} label="Date" name="date" type="date" required />
          <Input register={register} label="Hours" name="hours" type="number" required />
          <div>
            <SelectInput
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
            <SelectInput
              register={register}
              name="task"
              label="Task"
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
        <div>
          <Button type="submit" variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default NewTimesheet;

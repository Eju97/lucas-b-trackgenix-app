import { useState, useEffect } from 'react';
import styles from './form.module.css';
import { Input, Button, Spinner } from 'Components/Shared/index';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createTask, updateTask, getTask } from '../../../redux/tasks/thunks';
import { CREATE_TASK_SUCCESS, UPDATE_TASK_SUCCESS } from '../../../redux/tasks/constants';
import { useForm } from 'react-hook-form';
import { schema } from './validations.jsx';
import { joiResolver } from '@hookform/resolvers/joi';

const TaskForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const history = useHistory();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading } = useSelector((state) => state.tasks);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();

  const currentTask = useSelector((state) =>
    state.tasks.list.find((task) => task._id === params.id)
  );

  useEffect(() => {
    dispatch(getTask());
  }, []);

  useEffect(async () => {
    const id = params.id;
    if (id && currentTask) {
      setIsEditing(true);
      reset({
        description: currentTask.description
      });
    }
  }, [currentTask]);

  const onSubmit = async (data) => {
    if (!isEditing) {
      const response = await dispatch(createTask(data));
      if (response.type === CREATE_TASK_SUCCESS) {
        history.goBack();
      }
    } else {
      const id = params.id;
      const response = await dispatch(updateTask(id, data));
      if (response.type === UPDATE_TASK_SUCCESS) {
        history.goBack();
      }
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className={styles.container}>
      <div>{error && <h3>{error}</h3>}</div>
      <div>
        <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <Input
            label="Description"
            name="description"
            type="text"
            register={register}
            error={errors.description?.message}
          />
        </div>
        <div className={styles.input}>
          <Button type="submit" variant="confirm" name="Submit" />
          <Button onClick={() => history.goBack()} variant="cancel" name="Cancel" />
          <Button onClick={() => reset()} variant="reset" name="Reset" />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

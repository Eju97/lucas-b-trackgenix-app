import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheets, deleteTimesheet } from '../../redux/timesheets/thunks';

const TimeSheets = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { list: timesheetList, isLoading, error } = useSelector((state) => state.timesheets);
  const [timesheetId, setTimesheetId] = useState();
  const [showModal, setShowModal] = useState(false);

  const dateFormatted = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  useEffect(() => {
    dispatch(getTimesheets());
  }, []);

  if (isLoading) {
    return <h3 className={styles.position}>Loading Timesheets...</h3>;
  }
  if (error) {
    return <h3 className={styles.position}>Error: Could not load timesheets</h3>;
  }

  const timeSheetData = () => {
    return timesheetList.map((timesheet) => {
      return {
        ...timesheet,
        date: dateFormatted(timesheet.date),
        task: !timesheet.task ? (
          <p className={styles.none}>There is no task</p>
        ) : (
          timesheet.task.description
        ),
        employee: !timesheet.employee ? (
          <p className={styles.none}>There is no employee</p>
        ) : (
          `${timesheet.employee.name} ${timesheet.employee.lastName}`
        ),
        project: !timesheet.project ? (
          <p className={styles.none}>There is no project</p>
        ) : (
          timesheet.project.name
        )
      };
    });
  };

  const confirmationDelete = () => {
    dispatch(deleteTimesheet(timesheetId));
    closeModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onDelete = (_id) => {
    setTimesheetId(_id);
    setShowModal(true);
  };

  const onRowClick = (_id) => {
    history.push(`/time-sheets/form/${_id}`);
  };

  return (
    <section className={styles.container}>
      <Modal isOpen={showModal} handleClose={closeModal}>
        <div>
          <h3>Do you really want to delete this Timesheet?</h3>
        </div>
        <div>
          <Button onClick={closeModal} variant="cancel" name="Cancel" />
          <Button onClick={confirmationDelete} variant="confirm" name="Accept" />
        </div>
      </Modal>
      <h2>TimeSheets</h2>
      <Table
        data={timeSheetData()}
        headers={['description', 'date', 'hours', 'project', 'employee', 'task', 'delete']}
        onDelete={onDelete}
        onRowClick={onRowClick}
      />
      <div className={styles.containerButton}>
        <button
          className={styles.buttonAdd}
          type="button"
          onClick={() => history.push('/time-sheets/form')}
        >
          Create
        </button>
      </div>
    </section>
  );
};

export default TimeSheets;
